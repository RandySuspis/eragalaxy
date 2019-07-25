<?php

namespace App\Http\Middleware;

use Closure, Route;

class CheckMissingModules
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $key = explode("/", $request->path());
        $path = "../Modules/modules.json";
        $json = json_decode(file_get_contents($path), true);

        for ($i=0; $i<count($json); $i++){
            if ($key[0] == $json[$i]['key']){
                $ffs = scandir('../Modules');
                for ($j=0; $j<count($json[$i]['required']); $j++){
                    $found = 0;
                    foreach ($ffs as $ff){
                        if ($json[$i]['required'][$j] == $ff){
                            $found = 1;
                            break;
                        }
                    }
                    if ($found == 0){
                        echo "MISSING MODULES ".$json[$i]['required'][$j];
                        die();
                    }
                }

            }
        }

        return $next($request);
    }
}
