<?php

namespace App\Http\Middleware;

use Closure;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class SentinelAuthAdmin
{
    public function handle($request, Closure $next)
    {
//        dd(Sentinel::inRole("admin"));
        if(!Sentinel::inRole("admin"))
        {
//            dd($request);
            return redirect()->to('login');
        }

        return $next($request);
    }
}