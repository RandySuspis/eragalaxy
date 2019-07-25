<?php

namespace Modules\M01Login\Http\Controllers\API;

use App\Mail\Mailtrap;
use App\User;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel as Sentinel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use Modules\M00Base\Http\Controllers\Base\CRUDAPIController;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberAuth;
use Modules\M01Login\Entities\MemberFCM;

use Illuminate\Support\Str;
use Modules\M01Login\Entities\MemberID;

use Helper\ImageIntervention;
use Modules\M01Login\Entities\MemberSocialMedia;
use Modules\M01Login\Jobs\SendRegisterVerificationEmail;
use Modules\M01Login\Jobs\SendResetPasswordEmail;

class LoginAPIController extends CRUDAPIController
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|email',
            'password' => 'required|min:6',
            'fcm_id' => 'required',
            'device_name' => 'required'
        ]);
        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            $user = Member::where('UserName', '=', $request->get('username'))->get();
            if ($user->count() > 0){
                $user = $user->first();
                if (Hash::check($request->get('password'), $user->Password)) return $this->doLoginProcess($request, $user);
                else return $this->composeErrorJSON("Invalid Credentials!");
            } else return $this->composeErrorJSON("User not found");
        }
    }


    public function loginSocialMedia(Request $request){
        $validator = Validator::make($request->all(), [
            'provider' => 'required',
            'accessToken' => 'required',
            'fcm_id' => 'required',
            'device_name' => 'required'
        ]);

        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            if ($request->get('provider') == "google"){
                $client = new \Google_Client(['client_id' => env("GOOGLE_CLIENT_ID", "")]);
                $client->setClientId(env("GOOGLE_CLIENT_ID", ""));
                $client->setClientSecret(env("GOOGLE_CLIENT_SECRET", ""));
                $payload = $client->verifyIdToken($request->get('accessToken'));
                if ($payload) {
                    if ($payload['aud'] == env("GOOGLE_CLIENT_ID", "")){
                        $socialmedia = MemberSocialMedia::where('provider', '=', 'google')->where('provider_id', '=', $payload['sub'])->get()->first();
                        if ($socialmedia) {
                            $user = Member::where('UserName', '=', $socialmedia->user_id)->get()->first();
                            return $this->doLoginProcess($request, $user);
                        } else {
                            $user = Member::where('UserName', '=', $payload['email'])->where('status', '=', 1)->get()->first();
                            if ($user) {
                                $create = new MemberSocialMedia();
                                $create->user_id = $user->UserName;
                                $create->provider = 'google';
                                $create->provider_id = $payload['sub'];
                                $create->created_at = date('Y-m-d H:i:s');
                                $create->status = 1;
                                $create->save();
                                return $this->doLoginProcess($request, $user);
                            } else return $this->composeSuccessJSON("register");
                        }
                    } else return $this->composeErrorJSON("Invalid token");
                } else return $this->composeErrorJSON("Payload not found!");
            } else if ($request->get('provider') == "facebook"){
                try {
                    $fb = new Facebook([
                        'app_id' => env("FB_ID", ""),
                        'app_secret' => env("FB_SECRET", ""),
                        'default_graph_version' => 'v2.10'
                    ]);

                    $response = $fb->get('/me', $request->get('accessToken'));
                    $me = $response->getGraphUser();
                    $socialmedia = MemberSocialMedia::where('provider', '=', 'facebook')->where('provider_id', '=', $me->getID())->get();
                    if ($socialmedia->count() > 0) {
                        $socialmedia = $socialmedia->first();
                        $user = Member::where('UserName', '=', $socialmedia->user_id)->get()->first();
                        return $this->doLoginProcess($request, $user);
                    } else{
                        if ($me->getEmail() != null){
                            $user = Member::where('UserName', '=',$me->getEmail())->where('status', '=', 1)->get()->first();
                            if ($user) {
                                $create = new MemberSocialMedia();
                                $create->user_id = $user->UserName;
                                $create->provider = 'facebook';
                                $create->provider_id = $me->getID();
                                $create->created_at = date('Y-m-d H:i:s');
                                $create->status = 1;
                                $create->save();

                                return $this->doLoginProcess($request, $user);
                            } else return $this->composeSuccessJSON("register");
                        } else return $this->composeSuccessJSON("register");
                    }
                } catch (FacebookSDKException $e) {
                    return $this->composeErrorJSON("Facebook error!");
                }
            } else return $this->composeErrorJSON("Unknown provider!");
        }
    }



    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|email|unique:mastermember',
            'password' => 'required|min:6',
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'required',
            'birthday' => 'required',
            'phone' => 'required',
            'city' => 'required',
        ]);
        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            $random = Str::random(64);
            $create = new Member();
            $create->UserName = $request->get('username');
            $create->Password = Hash::make($request->get('password'));
            $create->FirstName = $request->get('firstname');
            $create->LastName = $request->get('lastname');
            $create->Gender = $request->get('gender');
            $create->Birthday = date('Y-m-d', strtotime($request->get('birthday')));
            $create->City = $request->get('city');
            $create->HP = $request->get('phone');
            $create->email_token = $random;
            $create->is_verified = 0;
            if ($create->save()){
                return $this->doRegisterProcess($request, $create->ID, $create, "basic", "");
            }
            else return $this->composeErrorJSON("Failed to save user");
        }
    }


    public function registerSocialMedia(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|email|unique:mastermember',
            'password' => 'required|min:6',
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'required',
            'birthday' => 'required',
            'phone' => 'required',
            'city' => 'required',
            'provider' => 'required',
            'accessToken' => 'required'

        ]);

        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            if ($request->get('provider') == "google") {
                $client = new \Google_Client(['client_id' => env("GOOGLE_CLIENT_ID", "")]);
                $client->setClientId(env("GOOGLE_CLIENT_ID", ""));
                $client->setClientSecret(env("GOOGLE_CLIENT_SECRET", ""));
                $payload = $client->verifyIdToken($request->get('accessToken'));
                if ($payload) {
                    $socialmedia = MemberSocialMedia::where('provider', '=', 'google')->where('provider_id', '=', $payload['sub'])->get();
                    if ($socialmedia->count() == 0) {
                        $random = Str::random(64);

                        $create = new Member();
                        $create->UserName = $request->get('username');
                        $create->Password = Hash::make($request->get('password'));
                        $create->FirstName = $request->get('firstname');
                        $create->LastName = $request->get('lastname');
                        $create->Gender = $request->get('gender');
                        $create->Birthday = date('Y-m-d', strtotime($request->get('birthday')));
                        $create->City = $request->get('city');
                        $create->HP = $request->get('phone');
                        $create->email_token = $random;
                        $create->is_verified = 0;

                        if ($create->save()) return $this->doRegisterProcess($request, $create->ID, $create, "social_media", $payload['sub']);
                        else return $this->composeErrorJSON("Failed to save user");
                    } else return $this->composeErrorJSON("User already registered with that social media");
                }
            } else if ($request->get('provider') == "facebook"){
                $fb = new Facebook([
                    'app_id' => env("FB_ID", ""),
                    'app_secret' => env("FB_SECRET", ""),
                    'default_graph_version' => 'v2.10'
                ]);
                $response = $fb->get('/me', $request->get('accessToken'));
                $me = $response->getGraphUser();
                $socialmedia = MemberSocialMedia::where('provider', '=', 'facebook')->where('provider_id', '=', $me->getID())->get();
                if ($socialmedia->count() == 0) {
                    $random = Str::random(64);

                    $create = new Member();
                    $create->UserName = $request->get('username');
                    $create->Password = Hash::make($request->get('password'));
                    $create->FirstName = $request->get('firstname');
                    $create->LastName = $request->get('lastname');
                    $create->Gender = $request->get('gender');
                    $create->Birthday = date('Y-m-d', strtotime($request->get('birthday')));
                    $create->City = $request->get('city');
                    $create->HP = $request->get('phone');
                    $create->email_token = $random;
                    $create->is_verified = 0;

                    if ($create->save()) return $this->doRegisterProcess($request, $create->ID, $create, "social_media", $me->getId());
                    else return $this->composeErrorJSON("Failed to save user");
                } else return $this->composeErrorJSON("User already registered with that social media");
            } else return $this->composeErrorJSON("Invalid social media provider!");
        }
    }


    public function logout(Request $request){
        $user = $request->get('user');
        $jwt_token = $request->get('jwt_auth_token');

        $fcm = MemberFCM::where('user_id', '=', $user->ID)->where('fcm_id', '=', $request->get('fcm_id'))->get();
        if ($fcm->count() > 0) $fcm->first()->delete();

        $auth = MemberAuth::where('user_id', '=', $user->ID)->where('token', '=', $jwt_token->token)->get();
        if ($auth->count() > 0) $auth->first()->delete();

        return $this->composeSuccessJSON("done");
    }


    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            $errorString = implode(",",$validator->messages()->all());
            return $this->composeErrorJSON($errorString);
        } else{
            $user = Member::where('UserName', '=', $request->get('email'))->get();
            if ($user->count() > 0){
                $random = Str::random(64);
                $user = $user->first();
                $user->password_reset_token = $random;

                if ($user->save()){
                    //send email
                    dispatch(new SendResetPasswordEmail($user));
                    return $this->composeSuccessJSON("Password reset! Check email");
                } else{
                    return $this->composeErrorJSON("Failed to reset password");
                }
            } else{
                return $this->composeErrorJSON("Email not registered");
            }
        }
    }


    public function refreshFCM(Request $request){
        $user = $request->get('user');
        $jwt_token = $request->get('jwt_auth_token');

        $fcm = MemberFCM::where('user_id', '=', $user->ID)->where('fcm_id', '=', $request->get('old_fcm_id'))->get();
        if ($fcm->count() > 0) $fcm->first()->delete();

        $newFCM = new MemberFCM();
        $newFCM->user_id = $user->ID;
        $newFCM->fcm_id = $request->get('new_fcm_id');
        $newFCM->created_at = date('Y-m-d H:i:s');
        $newFCM->status = 1;

        $newFCM->save();

        return $this->composeSuccessJSON("done");
    }




























    /*MAIN REPEATED FUNCTIONS*/
    public function doLoginProcess(Request $request, $user){
        $fcm = new MemberFCM();
        $fcm->user_id = $user->ID;
        $fcm->fcm_id = $request->get('fcm_id');
        $fcm->created_at = date('Y-m-d H:i:s');
        $fcm->status = 1;
        $fcm->save();

        $auth = new MemberAuth();
        $random = Str::random(255);
        $auth->user_id = $user->ID;
        $auth->device_name = $request->get('device_name');
        $auth->created_at = date('Y-m-d H:i:s');
        $auth->token = $random;
        $auth->status = 1;
        $auth->save();

        $membercode = MemberID::where('member_id', '=', $user->ID)->get()->first()->member_code;

        $payload = [
            'user_id' => $user->UserName,
            'firstname' => $user->FirstName,
            'lastname' => $user->LastName,
            'token' => $random,
            'logindatetime' => date('Y-m-d H:i:s'),
            'iat' => strtotime(date('Y-m-d H:i:s')),
            'iss' => 'PT. Imperium Happy Puppy'
        ];

        $secretKey = base64_decode(env('JWT_SECRET', ''));
        $jwt = JWT::encode($payload, $secretKey, 'HS512');

        $data = array(
            'username' => $user->UserName,
            'first_name' => $user->FirstName,
            'last_name' => $user->LastName,
            'birthday' => $user->Birthday,
            'gender' => $user->Gender,
            'phone' => $user->HP,
            'accessToken' => $jwt,
            'member_code' => $membercode
        );
        return $this->composeSuccessJSON($data);
    }


    public function doRegisterProcess(Request $request, $user_id, $create, $type, $provider_id){

        //upload image
        if ($request->file('image')){
            $upload_file = $user_id.".".$request->file('image')->getClientOriginalExtension();
            if (ImageIntervention::saveImage($request->file('image'), 1000, "user_uploads/", function() use ($upload_file){
                return $upload_file;
            })){
                $create->Photo = $upload_file;
                $create->save();
            }
        }

        //send email verification
        dispatch(new SendRegisterVerificationEmail($create));


        $fcm = new MemberFCM();
        $fcm->user_id = $user_id;
        $fcm->fcm_id = $request->get('fcm_id');
        $fcm->created_at = date('Y-m-d H:i:s');
        $fcm->status = 1;
        $fcm->save();

        $auth = new MemberAuth();
        $random = Str::random(255);
        $auth->user_id = $user_id;
        $auth->device_name = $request->get('device_name');
        $auth->created_at = date('Y-m-d H:i:s');
        $auth->token = $random;
        $auth->status = 1;
        $auth->save();

        $membercode = new MemberID();
        $membercode->yearmonth = date('ym');
        $membercode->member_id = $user_id;

        if ($type == "social_media"){
            //save social media
            $socialmedia = new MemberSocialMedia();
            $socialmedia->provider = $request->get('provider');
            $socialmedia->provider_id = $provider_id;
            $socialmedia->user_id = $create->UserName;
            $socialmedia->created_at = date('Y-m-d H:i:s');
            $socialmedia->status = 1;
            $socialmedia->save();
        }

        $member_code = "";
        if ($membercode->save()){
            $lastdigit = $membercode->id;
            if ($lastdigit < 10) $lastdigit = "00".$lastdigit;
            else if ($lastdigit < 100) $lastdigit = "0".$lastdigit;
            $member_code = "0000".$membercode->yearmonth."1".$lastdigit;
            $membercode->member_code = $member_code;
            $membercode->save();
        }

        $payload = [
            'user_id' => $create->UserName,
            'firstname' => $create->FirstName,
            'lastname' => $create->LastName,
            'token' => $random,
            'logindatetime' => date('Y-m-d H:i:s'),
            'iat' => strtotime(date('Y-m-d H:i:s')),
            'iss' => 'PT. Imperium Happy Puppy'
        ];

        $secretKey = base64_decode(env('JWT_SECRET', ''));
        $jwt = JWT::encode($payload, $secretKey, 'HS512');

        $data = array(
            'username' => $create->UserName,
            'first_name' => $create->FirstName,
            'last_name' => $create->LastName,
            'birthday' => $create->Birthday,
            'gender' => $create->Gender,
            'phone' => $create->HP,
            'accessToken' => $jwt,
            'member_code' => $member_code
        );

        return $this->composeSuccessJSON($data);
    }
}
