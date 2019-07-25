<?php

namespace Modules\M03PropertyTransaction\Http\Controllers;
use http\Env\Request;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M02PropertyAgent\Entities\DefaultSetting;


class TransactionController extends Base\CRUDReactController
{
    protected $moduleName = 'M03TransactionCommision';
    protected $tableName = 'transaction_property';
    protected $moduleBaseUrl = 'transaction';
    protected $show = ['id', 'invoice_id','property_value','agent_end_commission', 'office_commission_number', 'action'];

    public function _columnStructure()
    {
        return [];
    }

    public function create()
    {
        // Data ini : placeholder, Error & Validation, Label, class, options, masking, ispassword, isdisabled
        self::checkPermissionWrite($this->moduleBaseUrl);
        return view("base::baseCRUDReact/formAdd")->with([
            "typeColumns"=>$this->_showColumn(),
            "inputStructure"=>$this->_columnStructure(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "transactionCreate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }



}
