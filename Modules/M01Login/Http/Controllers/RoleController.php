<?php

namespace Modules\M01Login\Http\Controllers;

use Illuminate\Http\Request;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Modules\M00Base\Http\Controllers\Base as Base;

class RoleController extends Base\CRUDReactController
{
    protected $moduleBaseUrl = 'role';
    protected $moduleName = 'M01Login';
    protected $tableName = 'roles';
    // LIST & DETAIL DATA
    protected $hide = ["slug","created_at","updated_at"];
    protected $show = [];
//    protected $show = ['id','name','parent_agent_name','grand_parent_agent_name','office_name','action'];
//    protected $showLabel = ['id','Agent Name','Parent Agent','Grand Parent','Office',' '];
//    protected $showWidth = ['col-sm-1','col-sm-3','col-sm-2','col-sm-2','col-sm-2','col-sm-1'];
}