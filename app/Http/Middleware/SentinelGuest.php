<?php

namespace App\Http\Middleware;

use Closure;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class SentinelGuest
{
    public function handle($request, Closure $next)
    {
        if(!Sentinel::guest())
        {
            return redirect()->to('primary');
        }

        return $next($request);
    }
}