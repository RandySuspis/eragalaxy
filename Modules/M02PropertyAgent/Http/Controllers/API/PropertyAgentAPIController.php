<?php

namespace Modules\M02PropertyAgent\Http\Controllers\API;

use Illuminate\Http\Request ;
use Illuminate\Http\Response as Response;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;

class PropertyAgentAPIController extends Base\CRUDAPIController
{
    protected $moduleBaseUrl = 'agent';
    protected $moduleName = 'PropertyAgent';
    protected $tableName = 'property_agent';
    protected $hide = ['id', 'created_at', 'updated_at'];
    protected $hideSelect = [];
    protected $apiShowList = '/api/agent/list';

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return $this->composeView('propertyagent::propertyAgentIndex')->with([
            'title2' => "gila",
            'meta1' => "gilani"
        ]);
    }


    /* -----------  PRIVATE FUNCTION  ------------------- */

    protected function getOfficeData()
    {
        return response()->json(DB::table("branch_office")->select("id", "name")->get());
    }

}
