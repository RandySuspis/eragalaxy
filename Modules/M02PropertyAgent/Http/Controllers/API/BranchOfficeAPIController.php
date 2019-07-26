<?php

namespace Modules\M02PropertyAgent\Http\Controllers\API;


use Modules\M00Base\Http\Controllers\Base as Base;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class BranchOfficeAPIController extends Base\CRUDAPIController
{


    protected $tableName = "branch_office";
    protected $show = ["id","name","address","phone1","action"];
    protected $hide = [];
    protected $hideSelect = [];
    protected $apiShowList = '/api/branch/list';

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return redirect('branch/list');
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

        $branchData = DB::table("$this->tableName as b")
            ->select('b.id','b.name as office_name')->get();
        $columnType = DB::select("describe $this->tableName");
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }
        for ($i=0; $i<count($branchData); $i++){
            $branchData[$i]->index = $i+1;
            $theId = $branchData[$i]->id;
            if($startDate!="" && $endDate!="")
                $gross = DB::table('transaction_property')
                    ->select(DB::raw('SUM(transaction_property.gross_commission) as gross'))
                    ->where('transaction_property.office_id','=',$theId)
                    ->whereBetween('transaction_property.created_at', [$startDate,$endDate])
                    ->first();
            else
                $gross = DB::table('transaction_property')
                    ->select(DB::raw('SUM(transaction_property.gross_commission) as gross'))
                    ->where('transaction_property.office_id','=',$theId)
                    ->first();
            if($gross->gross == null) {
                $branchData[$i]->total_gross = 0;
                $branchData[$i]->top_agent = "-";
                $branchData[$i]->total_commission = 0;
            } else {
                $indexTop=0;
                $max=0;
                $branchData[$i]->total_gross = $gross->gross;
                $agentData = DB::table("property_agent as a")
                    ->select('a.id','a.name')
                    ->where('a.office_id','=',$theId)->get();
                for ($j=0; $j<count($agentData); $j++){
                    $theId = $agentData[$j]->id;
                    if($startDate!="" && $endDate!="")
                        $gross = DB::table('agent_commission')
                            ->select(DB::raw('SUM(agent_commission.commission_gross) as gross'))
                            ->where('agent_commission.agent_id','=',$theId)
                            ->whereBetween('agent_commission.created_at', [$startDate,$endDate])
                            ->first();
                    else
                        $gross = DB::table('agent_commission')
                            ->select(DB::raw('SUM(agent_commission.commission_gross) as gross'))
                            ->where('agent_commission.agent_id','=',$theId)
                            ->first();
                    if($gross->gross == null) {
                        $agentData[$j]->gross = 0;
                    } else {
                        $agentData[$j]->gross = $gross->gross;
                        if($gross->gross>$max){
                            $max=$gross->gross;
                            $indexTop=$j;
                        }
                    }
                }
                $branchData[$i]->top_agent = $agentData[$indexTop]->name;
                $branchData[$i]->total_commission = $agentData[$indexTop]->gross;
            }
        }
        $agentData = DB::table("property_agent as a")
            ->select('a.id','a.name')
            ->where('a.office_id','=',$theId)->get();
        for ($i=0; $i<count($agentData); $i++){
            $theId = $agentData[$i]->id;
            $transaction = DB::table('agent_commission')
                ->select('agent_commission.*')
                ->where('agent_commission.agent_id','=',$theId)
                ->get()->count();
            $agentData[$i]->transactionCount = $transaction;
        }
//        dd($agentData);
        for ($i=0; $i<count($agentData); $i++){
            $theId = $agentData[$i]->id;
            $gross = DB::table('agent_commission')
                ->select(DB::raw('SUM(agent_commission.commission_gross) as gross'))
                ->where('agent_commission.agent_id','=',$theId)
                ->first();
            if($gross->gross == null) {
                $agentData[$i]->gross = 0;
            } else {
                $agentData[$i]->gross = $gross->gross;
            }
        }
//        dd($branchData);
//        for ($i=0; $i<count($agentData); $i++){
//            $theId = $agentData[$i]->id;
//            $transaction = DB::table('agent_commission')
//                ->select('agent_commission.*')
//                ->where('agent_commission.agent_id','=',$theId)
//                ->get()->count();
//            $agentData[$i]->transactionCount = $transaction;
//        }
//        for ($i=0; $i<count($agentData); $i++){
//            $theId = $agentData[$i]->id;
//            $gross = DB::table('agent_commission')
//                ->select(DB::raw('SUM(agent_commission.commission_gross) as gross'))
//                ->where('agent_commission.agent_id','=',$theId)
//                ->first();
//            if($gross->gross == null) {
//                $agentData[$i]->gross = 0;
//            } else {
//                $agentData[$i]->gross = $gross->gross;
//            }
//        }

        $result = $branchData;
        $json = [
            "data"=>$result,
            "show"=>DB::getSchemaBuilder()->getColumnListing($this->tableName),
        ];
        return $this->composeSuccessJSON($json);
    }

}
