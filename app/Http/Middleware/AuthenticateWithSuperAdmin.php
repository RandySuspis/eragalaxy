<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Modules\M01Login\Entities\MemberRole;
use Modules\M01Login\Entities\Roles;

class AuthenticateWithSuperAdmin
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::guard()->user();
        $roleId = MemberRole::where('user_id', '=', $user->id)->get()->first()->role_id;
        $roleName = Roles::where('id','=',$roleId)->get()->first()->name;
        if($roleName != "superAdmin")
        {
            return redirect()->to('agent');
        }

        return $next($request);
    }
}
