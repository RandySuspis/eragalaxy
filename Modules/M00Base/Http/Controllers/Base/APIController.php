<?php

namespace Modules\M00Base\Http\Controllers\Base;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class APIController extends Controller
{
    protected $tableName = "";
    protected $moduleName = "";

    /**
     *
     * @var
     * @return View
     */
    protected function composeSuccessJSON($jsonRes)
    {
        $json = [];
        $json['result'] = "success";
        $json['data'] = $jsonRes;

        return response()->json($json);
    }

    /**
     *
     *
     * @return
     */
    protected function composeErrorJSON($stringTarget)
    {
        $json = [];
        $json['result'] = "failed";
        $json['data'] = $stringTarget;

        return response()->json($json);
    }




}
