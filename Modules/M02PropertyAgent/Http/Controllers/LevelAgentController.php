<?php

namespace Modules\M02PropertyAgent\Http\Controllers;


use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M00Base\Entities\BaseModel as BaseModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Modules\M02PropertyAgent\Entities\LevelAgent as LevelAgent;

class LevelAgentController extends Base\CRUDReactController
{
    protected $moduleName = 'PropertyAgent';
    protected $tableName = 'level_agent';
    protected $hide = ["deleted_at", "created_at","updated_at"];
    protected $moduleBaseUrl = 'levelAgent';
    protected $show = [];



    public function _columnStructure()
    {
        return LevelAgent::getStructure();
    }
}
