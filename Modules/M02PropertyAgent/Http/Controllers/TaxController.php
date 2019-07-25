<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Modules\M00Base\Http\Controllers\Base as Base;
use Illuminate\Routing\Controller;


class TaxController extends Base\CRUDReactController{
    protected $moduleBaseUrl = 'tax';
    protected $moduleName = 'M02PropertyAgent';
    protected $tableName = 'tax';
    // LIST & DETAIL DATA
    protected $show = [];
}