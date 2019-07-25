<?php

namespace Modules\M02PropertyAgent\Http\Controllers\API;

use Illuminate\Http\Request ;
use Illuminate\Http\Response as Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;

class SecondaryProjectAPIController extends Base\CRUDAPIController
{

    protected $moduleName = 'PropertyAgent';
    protected $tableName = "secondary_project";
    protected $show = [];
    protected $hide = [];
    protected $hideSelect = [];
    protected $apiShowList = '/api/secondary/list';




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





}
