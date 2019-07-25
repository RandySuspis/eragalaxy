<?php

namespace Modules\M01Login\Http\Controllers;

use Helper\JWTToken;
use Illuminate\Support\Facades\Auth;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberSocialMedia;
use Socialite;

use Illuminate\Routing\Controller;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel as Sentinel;


class SocialMediaController extends Controller
{

    public function redirectToProvider($provider){

        return Socialite::driver($provider)->redirect();
    }


    public function handleProviderCallback($provider)
    {
        $user = Socialite::driver($provider)->user();
        $socialite_token = $user->token;

        $socmed = MemberSocialMedia::where('provider', '=', $provider)->where('provider_id', '=', $user->id)->get()->first();
        if ($socmed){
            $member = Member::where('UserName', '=', $socmed->user_id)->get()->first();
            if ($member){
                Auth::login($member);

                $jwt = JWTToken::generateToken($member, "Website");
                session(['JWT' => $jwt]);

                return redirect('/');
            } else return redirect()->back()->with("globalerrors", "User not found!");
        } else{
            $member = Member::where('UserName', '=', $user->email)->where('status', '=', 1)->get()->first();
            if ($member){
                $create = new MemberSocialMedia();
                $create->user_id = $member->UserName;
                $create->provider = $provider;
                $create->provider_id = $user->id;
                $create->created_at = date('Y-m-d H:i:s');
                $create->status = 1;
                $create->save();
                Auth::login($member);

                $jwt = JWTToken::generateToken($member, "Website");
                session(['JWT' => $jwt]);

                return redirect('/');
            } else{
                //register
                $firstname = $user->name;
                $lastname = "";
                $email = "";
                if ($user->email != null) $email = $user->email;
                session([
                    "social_media_id" => $user->id,
                    "social_media_provider" => $provider,
                    "social_media_token" => $socialite_token,
                    "first_name" => $firstname,
                    "last_name" => $lastname,
                    "email" => $email,
                    "registerType" => "socialMedia"
                ]);

                return redirect('/register/2');
            }
        }
    }
}
