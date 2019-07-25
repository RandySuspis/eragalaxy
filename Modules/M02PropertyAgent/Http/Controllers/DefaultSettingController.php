<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Modules\M00Base\Http\Controllers\Base as Base;
use Illuminate\Routing\Controller;


class DefaultSettingController extends Base\CRUDReactController{
    protected $moduleBaseUrl = 'default';
    protected $moduleName = 'M02PropertyAgent';
    protected $tableName = 'default_setting';
    // LIST & DETAIL DATA
    protected $show = [];
}