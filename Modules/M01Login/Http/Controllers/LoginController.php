<?php

namespace Modules\M01Login\Http\Controllers;

use App\Mail\Mailtrap;
use Firebase\JWT\JWT;
use Helper\ImageIntervention;
use Helper\JWTToken;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel as Sentinel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Modules\M01Login\Emails\ResetPasswordEmail;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberAuth;
use Modules\M01Login\Entities\MemberFCM;
use Modules\M01Login\Entities\MemberID;
use Modules\M01Login\Entities\MemberSocialMedia;
use Modules\M01Login\Jobs\SendRegisterVerificationEmail;
use Modules\M01Login\Jobs\SendResetPasswordEmail;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return view('login::index');
    }


    /**
     * Create login post function
     *
     * @param  Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     */
    public function loginPost(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string|min:6'
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $user = Member::where('email', '=', $request->get('email'))->get()->first();
        if ($user){
            if (Hash::check($request->get('password'), $user->getAuthPassword())){
                Auth::login($user, true);
                return redirect('agent');
            } else{
                toast()->error("Wrong username and password combination", "Error!");
                return redirect('/login');
            }
        } else{
            toast()->error("Wrong username and password combination", "Error!");
            return redirect('/login');
        }
    }






    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function registerStep1()
    {
        return view('login::register_step_1');
    }

    public function registerStep2()
    {

        return view('login::register_step_2')->with([
                                "JS" => [
                                    "first_name" => "'".session('first_name', '')."'",
                                    "last_name" => "'".session('last_name', '')."'",
                                    "email" => "'".session('email', '')."'",
                                    "registerType" => "'".session('registerType', '')."'"
                                ]
        ]);
    }

    public function registerStep3(){
        return view('login::register_step_3')->with([
            'JS' => [
                'first_name' => "'".session('first_name', '')."'",
                'last_name' => "'".session('last_name', '')."'",
                'email' => "'".session('email', '')."'",
                'password' => "'".session('password', '')."'",
                'registerType' => "'".session('registerType', '')."'",
                'gender' => "'".session('gender', '')."'",
                'birthday' => "'".session('birthday', '')."'",
                'phone' => "'".session('phone', '')."'",
                'city' => "'".session('city', '')."'"
            ]
        ]);
    }

    public function registerByEmailPost(Request $request){
        session()->flush();
        session(['registerType' => 'email']);
        return redirect('/register/2');
    }

    public function registerStep2Post(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required:min:6',
            'confirm_password' => 'required|same:password',
            'registerType' => 'required'
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $check = Member::where('UserName', '=', $request->get('email'))->get()->first();

        if (!$check){
            if ($request->get('registerType') == "socialMedia"){
                $token = session("social_media_token", "");
                $provider = session("social_media_provider", "");
                if ($token == "" || $provider == ""){
                    toast()->error("Invalid social media token, please start from the beginning", "Error!");
                    return redirect()->back();
                } else{
                    $user = Socialite::driver($provider)->userFromToken($token);
                    if ($user){
                        if ($user->email != null){
                            if ($user->email != $request->get('email')){
                                toast()->error("Social media email and current email field not the same, please check again!", "Error!");
                                return redirect()->back();
                            }
                        }
                    } else{
                        toast()->error("Invalid social media token, please start from the beginning", "Error!");
                        return redirect()->back();
                    }
                }
            }

            session([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'email' => $request->get('email'),
                'password' => $request->get('password'),
                'registerType' => $request->get('registerType')
            ]);

            return redirect()->to('/register/3');
        } else{
            toast()->error("E-mail already taken!", "Error!");
            return redirect()->back();
        }

    }

    public function registerStep3Post(Request $request){
        $validate = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required:min:6',
            'gender' => 'required',
            'birthday' => 'required',
            'phone' => 'required',
            'city' => 'required',
            'registerType' => 'required',
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $check = Member::where('UserName', '=', $request->get('email'))->get()->first();

        if (!$check){
            $random = Str::random(64);

            $create = new Member();
            $create->UserName = $request->get('email');
            $create->Password = Hash::make($request->get('password'));
            $create->FirstName = $request->get('first_name');
            $create->LastName = $request->get('last_name');
            $create->Gender = $request->get('gender');
            $create->Birthday = date('Y-m-d', strtotime($request->get('birthday')));
            $create->City = $request->get('city');
            $create->HP = $request->get('phone');
            $create->email_token = $random;
            $create->is_verified = 0;

            if ($create->save()){
                //upload image
                if ($request->file('image')){
                    $upload_file = $create->ID.".".$request->file('image')->getClientOriginalExtension();
                    if (ImageIntervention::saveImage($request->file('image'), 1000, "user_uploads/", function() use ($upload_file){
                        return $upload_file;
                    })){
                        $create->Photo = $upload_file;
                        $create->save();
                    }
                }

                //send email verification
                dispatch(new SendRegisterVerificationEmail($create));

                $membercode = new MemberID();
                $membercode->yearmonth = date('ym');
                $membercode->member_id = $create->ID;

                if ($request->get('registerType') == "social_media"){
                    //save social media
                    $socialmedia = new MemberSocialMedia();
                    $socialmedia->provider = session('social_media_provider');
                    $socialmedia->provider_id = session('social_media_id');
                    $socialmedia->user_id = $create->UserName;
                    $socialmedia->created_at = date('Y-m-d H:i:s');
                    $socialmedia->status = 1;
                    $socialmedia->save();
                }

                if ($membercode->save()){
                    $lastdigit = $membercode->id;
                    if ($lastdigit < 10) $lastdigit = "00".$lastdigit;
                    else if ($lastdigit < 100) $lastdigit = "0".$lastdigit;
                    $member_code = "0000".$membercode->yearmonth."1".$lastdigit;
                    $membercode->member_code = $member_code;
                    $membercode->save();
                }

                Auth::login($create, true);
                $jwt = JWTToken::generateToken($create, "Website");
                session(['JWT' => $jwt]);
                return redirect('/');
            } else{
                toast()->error("Failed to save user!", "Error!");
                return redirect()->back();
            }
        } else{
            toast()->error("E-mail already taken!", "Error!");
            return redirect()->back();
        }
    }



    public function forgotPassword()
    {
        return view('login::forgotPassword');
    }

    public function forgotPasswordPost(Request $request)
    {
        $user = Member::where('UserName', '=', $request->get('email'))->where('status', '=', 1)->get()->first();
        if ($user){
            $random = Str::random(64);
            $user->password_reset_token = $random;
            if ($user->save()){
//                dispatch(new SendResetPasswordEmail($user));
                Mail::to($user->UserName)->send(new ResetPasswordEmail($user));
                toast()->success("E-mail sent! Please check your email", "Success!");
                return redirect()->to('/');
            } else{
                toast()->error("Failed to send e-mail!", "Error!");
                return redirect()->back();
            }
        } else{
            toast()->error("User not found!", "Error!");
            return redirect()->back();
        }
    }

    public function logout()
    {
        $jwt = session("JWT", "");

        if($jwt!=""){
            $token = JWT::decode($jwt, base64_decode(env("JWT_SECRET", "")), array('HS512'));

            $auth = MemberAuth::where('user_id', '=', Auth::user()->ID)->where('token', '=', $token->token)->get();
            if ($auth->count() > 0) $auth->first()->delete();
        }

        Auth::logout();
        Session::flush();

        return redirect('login');
    }




    public function resetPasswordLink($email, $token){
        $member = Member::where('UserName', '=', $email)->where('password_reset_token', '!=', 'NULL')->where('password_reset_token', '=', $token)->get()->first();
        if ($member){
            return view('login::forgotPasswordField')->with([
                "JS" => [
                    "email" => '\''.$member->UserName.'\'',
                    "token" => '\''.$member->password_reset_token.'\''
                ]
            ]);
        } else{
            toast()->error("Invalid user token combination!", "Error!");
            return redirect()->to("/");
        }
    }

    public function doResetPasswordLink(Request $request){
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);

        if ($validate->fails()){
            $error = $validate->errors()->first();
            toast()->error($error);
            return redirect()->back()->withInput();
        }

        $member = Member::where('UserName', '=', $request->get('email'))
                        ->where('password_reset_token', '!=', 'NULL')
                        ->where('password_reset_token', '=', $request->get('token'))
                        ->where('status', '=', 1)
                        ->get()->first();

        if ($member){
            $member->Password = Hash::make($request->get('new_password'));

            if ($member->save()){
                toast()->success("Password has been reset!", "Success!");
                return redirect()->to("/");
            } else{
                toast()->error("Failed to reset password!", "Error!");
                return redirect()->back();
            }
        } else{
            toast()->error("Invalid user token combination!", "Error!");
            return redirect()->back();
        }
    }




    public function emailVerifyLink($email, $token){
        $member = Member::where('UserName', '=', $email)
                        ->where('email_token', '!=', 'NULL')
                        ->where('email_token', '=', $token)
                        ->where('is_verified', '=', 0)
                        ->where('status', '=', 1)
                        ->get()->first();
        if ($member){
            $member->is_verified = 1;
            if ($member->save()){
                toast()->success("Your account has been verified!", "Success!");
                return redirect()->to("/");
            } else{
                toast()->error("Invalid user token combination!", "Error!");
                return redirect()->to("/");
            }
        } else{
            toast()->error("Invalid user token combination!", "Error!");
            return redirect()->to("/");
        }
    }
}
