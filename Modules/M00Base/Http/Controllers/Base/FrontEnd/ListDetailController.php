<?php

namespace Modules\M00Base\Http\Controllers\Base\FrontEnd;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ListDetailController extends BaseController
{
    protected $tableName = "";
    protected $moduleName = "";

    public function list(Request $request, $page=0){
    }

    public function detail(Request $request, $id){

    }

}
