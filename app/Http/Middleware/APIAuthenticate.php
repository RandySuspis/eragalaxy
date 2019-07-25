<?php
namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use Modules\M01Login\Entities\Member;
use Modules\M01Login\Entities\MemberAuth;

class APIAuthenticate{

    public function handle($request, Closure $next){
        try{
            header('Cache-Control: no-cache, must-revalidate, max-age=0');
            $header = $request->header('Authorization');
            $data = explode(' ', $header);
            $token = JWT::decode($data[1], base64_decode(env("JWT_SECRET", "")), array('HS512'));

            $user = Member::where('UserName', '=', $token->user_id)->get()->first();
            $auth = MemberAuth::where('user_id', '=', $user->ID)->where('token', '=', $token->token)->get();
            if ($auth->count() > 0){
                $request->attributes->add(['user' => $user, 'jwt_auth_token' => $token]);
                return $next($request);
            } else{
                abort(403, "Access denied");
            }
        } catch (SignatureInvalidException $e){
            abort(403, 'Access denied');
        }
    }

}