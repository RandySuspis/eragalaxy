<?php

namespace App\Http\Middleware;

use Closure;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class SentinelAuth
{
    public function handle($request, Closure $next)
    {
//        dd(Sentinel::getRoleRepository());
        if(Sentinel::guest())
        {
            return redirect()->to('login');
        }

        return $next($request);
    }
}