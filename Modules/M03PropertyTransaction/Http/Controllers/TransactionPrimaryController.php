<?php

namespace Modules\M03PropertyTransaction\Http\Controllers;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M02PropertyAgent\Entities\DefaultSetting;

class TransactionPrimaryController extends Base\CRUDReactController
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
                'mainId'=> "transactionPrimaryCreate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function edit(Request $request, $theId)
    {
        $data = DB::table($this->tableName)->find($theId);
        if (!$data) {
            abort(404);
        }
        if($data->property_id==null){
            return redirect('transaction/update/'.$theId);
        }
        return view("base::baseCRUDReact/formUpdate")->with([
            "typeColumns"=>$this->_getFinalTypeColumn(),
            "inputStructure"=>$this->_columnStructure(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "transactionPrimaryUpdate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
                'dataId' =>$theId
            ]
        ]);
    }

    public function apiDetail(Request $request)
    {
        $sql = $this->_baseSQLForController();
        $id = $request->input('id');
        $sql = $sql->where('id',$id);

        $result = $this->apiDetailCreator($id, "id", $sql, false, false);

//        $result["data"]->agent = DB::table("primary_project_coordinator")->select("id","percent_commission")->where("primary_project_id",$id)->get();
        return response()->json($result, 200);
    }

}
