<?php

namespace Modules\M02PropertyAgent\Http\Controllers\API;


use Modules\M00Base\Http\Controllers\Base as Base;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class BranchOfficeAPIController extends Base\CRUDAPIController
{


    protected $tableName = "branch_office";
    protected $show = ["id","name","address","phone1","action"];
    protected $hide = [];
    protected $hideSelect = [];
    protected $apiShowList = '/api/branch/list';

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return redirect('branch/list');
    }

}
