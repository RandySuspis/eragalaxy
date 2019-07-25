<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Illuminate\Http\Request ;
use Illuminate\Http\Response as Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;

class SecondaryProjectController extends Base\CRUDController
{
    protected $moduleBaseUrl = 'secondary';
    protected $moduleName = 'PropertyAgent';
    protected $tableName = "secondary_project";
    protected $show = [];

}
