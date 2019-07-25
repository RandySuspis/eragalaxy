<?php
namespace Helper;

use Closure;
use Firebase\JWT\JWT;
use Illuminate\Support\Str;
use Modules\M01Login\Entities\MemberAuth;


class JWTToken {

    public static function generateToken($user, $device_name){
        $auth = new MemberAuth();
        $random = Str::random(255);
        $auth->user_id = $user->id;
        $auth->device_name = $device_name;
        $auth->created_at = date('Y-m-d H:i:s');
        $auth->token = $random;
        $auth->status = 1;
        $auth->save();

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

        return $jwt;
    }

}