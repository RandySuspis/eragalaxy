<?php
namespace Modules\M02PropertyAgent\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response as Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;

class PrimaryProjectAPIController extends Base\CRUDAPIController
{

    protected $moduleName = 'PropertyAgent';
    protected $tableName = "primary_project";
    protected $show = ['show_id','project_name','note','percent_listing_commission','agent_name','action'];
    protected $hide = [];
    protected $hideSelect = [];
    protected $apiShowList = '/api/primary/list';



    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(){
        return $this->composeView('propertyagent::propertyAgentIndex')->with([
            'title2' => "gila",
            'meta1' => "gilani"
        ]);
    }

    public function indexWithPrimaryLister(){
        $primaryProject = DB::table("$this->tableName as b")->get();
        foreach ($primaryProject as $project){
            $lister = DB::table("primary_project_lister as a")->where('primary_project_id',$project->id)->get();
            $project->lister = $lister;
        }

    }

    public function _baseSQLForController($selectStr = null){
        $sql = DB::table("$this->tableName as b")
            ->leftJoin('property_agent as a','b.agent_lister_id','a.id')
            ->select('a.name','b.*', 'b.id as show_id' );
        return $sql;
    }

    public function read($theId){
        $sql = DB::table("$this->tableName as b")
            ->leftJoin('property_agent as a','b.agent_lister_id','a.id')
            ->select('a.name','b.*', 'b.id as show_id' )
            ->where('b.id','=',$theId);
        $coor = DB::table('primary_project_coordinator as c')
            ->leftJoin("$this->tableName as b", 'c.primary_project_id','b.id')
            ->select('c.*')
            ->where('c.primary_project_id','=',$theId)->get();
        $columnType = DB::select("describe $this->tableName");
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }
        $result= $sql->first();
        $json = [
            "data"=>$result,
            "coordinators"=>$coor,
            "show"=>DB::getSchemaBuilder()->getColumnListing($this->tableName),
        ];

        return $this->composeSuccessJSON($json);
    }

    public function getReportData(Request $request)
    {
        $startDate = "";
        $endDate = "";
        if ($request->has('startDate')) $startDate = $request->get('startDate');
        if ($request->has('endDate')) $endDate = $request->get('endDate');
        if ($endDate!=""){
            $temp = str_replace('-','/', $endDate);
            $endDate = date('Y-m-d',strtotime($temp . "+1 days"));
        }
        $primaryData = DB::table("$this->tableName as b")
            ->select('b.id','b.project_name as name')->get();
        $columnType = DB::select("describe $this->tableName");
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }
        for ($i=0; $i<count($primaryData); $i++){
            $primaryData[$i]->index = $i+1;
            $theId = $primaryData[$i]->id;
            if($startDate!="" && $endDate!="")
                $transaction = DB::table('transaction_property')
                    ->select(DB::raw('SUM(transaction_property.property_value) as total'),DB::raw('SUM(transaction_property.gross_commission) as gross'),DB::raw('COUNT(transaction_property.gross_commission) as transactionCount'))
                    ->where('transaction_property.property_id','=',$theId)
                    ->whereBetween('transaction_property.created_at', [$startDate,$endDate])
                    ->get()->first();
            else
                $transaction = DB::table('transaction_property')
                    ->select(DB::raw('SUM(transaction_property.property_value) as total'),DB::raw('SUM(transaction_property.gross_commission) as gross'),DB::raw('COUNT(transaction_property.gross_commission) as transactionCount'))
                    ->where('transaction_property.property_id','=',$theId)
                    ->get()->first();
            if($transaction->gross == null) {
                $primaryData[$i]->total_gross = 0;
            } else {
                $primaryData[$i]->total_gross = $transaction->gross;
            }
            $primaryData[$i]->transaction_count = $transaction->transactionCount;
            if($transaction->total == null) {
                $primaryData[$i]->total = 0;
            } else {
                $primaryData[$i]->total = $transaction->total;
            }
        }

        $result = $primaryData;
        $json = [
            "data"=>$result,
            "show"=>DB::getSchemaBuilder()->getColumnListing($this->tableName),
        ];
        return $this->composeSuccessJSON($json);
    }

    public function getReportDetail(Request $request)
    {
        $startDate = "";
        $endDate = "";
        $theId = "";
        if ($request->has('primary_project_id')) $theId = $request->get('primary_project_id');
        $primaryData = DB::table("$this->tableName as b")
            ->leftJoin('property_agent as c','b.agent_lister_id', 'c.id')
            ->select('b.id','b.project_name', 'c.name as lister_name')
            ->where('b.id','=',$theId)->first();

        $koordinatorData = DB::table('primary_project_coordinator')
            ->select('agent_name')
            ->where('primary_project_id','=',$theId)->get();
        $primaryData->koordinator = $koordinatorData;

        if ($request->has('startDate')) $startDate = $request->get('startDate');
        if ($request->has('endDate')) $endDate = $request->get('endDate');
        if ($endDate!=""){
            $temp = str_replace('-','/', $endDate);
            $endDate = date('Y-m-d',strtotime($temp . "+1 days"));
        }

        $transactionData = DB::table('transaction_property as b')
            ->leftJoin('property_agent as c', 'b.agent_id','c.id')
            ->select('b.created_at as date', 'c.name as agent_name', 'b.gross_commission', 'b.property_value')
            ->where('b.property_id','=',$theId)
            ->whereBetween('b.created_at',[$startDate,$endDate])->get();
        $primaryData->transaction = $transactionData;
//        $primaryData = DB::table("$this->tableName as b")
//            ->select('b.id','b.project_name as name')->get();
//        $columnType = DB::select("describe $this->tableName");
//        $selectStr = [];
//        for ($i=0; $i<count($columnType); $i++){
//            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
//                $selectStr[] = $columnType[$i]->Field;
//            }
//        }
//        for ($i=0; $i<count($primaryData); $i++){
//            $primaryData[$i]->index = $i+1;
//            $theId = $primaryData[$i]->id;
//            if($startDate!="" && $endDate!="")
//                $transaction = DB::table('transaction_property')
//                    ->select(DB::raw('SUM(transaction_property.property_value) as total'),DB::raw('SUM(transaction_property.gross_commission) as gross'),DB::raw('COUNT(transaction_property.gross_commission) as transactionCount'))
//                    ->where('transaction_property.property_id','=',$theId)
//                    ->whereBetween('transaction_property.created_at', [$startDate,$endDate])
//                    ->get()->first();
//            else
//                $transaction = DB::table('transaction_property')
//                    ->select(DB::raw('SUM(transaction_property.property_value) as total'),DB::raw('SUM(transaction_property.gross_commission) as gross'),DB::raw('COUNT(transaction_property.gross_commission) as transactionCount'))
//                    ->where('transaction_property.property_id','=',$theId)
//                    ->get()->first();
//            if($transaction->gross == null) {
//                $primaryData[$i]->total_gross = 0;
//            } else {
//                $primaryData[$i]->total_gross = $transaction->gross;
//            }
//            $primaryData[$i]->transaction_count = $transaction->transactionCount;
//            if($transaction->total == null) {
//                $primaryData[$i]->total = 0;
//            } else {
//                $primaryData[$i]->total = $transaction->total;
//            }
//        }

        $result = $primaryData;
        $json = [
            "data"=>$result,
            "show"=>DB::getSchemaBuilder()->getColumnListing($this->tableName),
        ];
        return $this->composeSuccessJSON($json);
    }
}
