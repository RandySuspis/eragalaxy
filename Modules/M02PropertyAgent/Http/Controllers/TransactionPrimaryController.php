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

class TransactionPrimaryController extends Base\CRUDReactController
{
    protected $moduleName = 'M02PropertyAgent';
    protected $tableName = 'transaction_primary';
    protected $hide = ["deleted_at", "created_at","updated_at"];
    protected $moduleBaseUrl = 'transactionprimary';
    protected $show = [];

    public function create()
    {
        // Data ini : placeholder, Error & Validation, Label, class, options, masking, ispassword, isdisabled

        return view("base::baseCRUDReact/formAdd")->with([
            "typeColumns"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "transactionPrimaryCreate",
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }
}
