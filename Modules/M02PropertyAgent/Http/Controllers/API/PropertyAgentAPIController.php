<?php

namespace Modules\M02PropertyAgent\Http\Controllers\API;

use Illuminate\Http\Request ;
use Illuminate\Http\Response as Response;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;

class PropertyAgentAPIController extends Base\CRUDAPIController
{
    protected $moduleBaseUrl = 'agent';
    protected $moduleName = 'PropertyAgent';
    protected $tableName = 'property_agent';
    protected $hide = ['id', 'created_at', 'updated_at'];
    protected $hideSelect = [];
    protected $apiShowList = '/api/agent/list';

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return $this->composeView('propertyagent::propertyAgentIndex')->with([
            'title2' => "gila",
            'meta1' => "gilani"
        ]);
    }


    /* -----------  PRIVATE FUNCTION  ------------------- */

    protected function getOfficeData()
    {
        return response()->json(DB::table("branch_office")->select("id", "name")->get());
    }

    public function getReportData()
    {
        $agentData = DB::table("$this->tableName as a")
            ->leftJoin('branch_office as b','a.office_id','b.id')
            ->select('a.id','a.name','b.name as office_name')->get();
        $columnType = DB::select("describe $this->tableName");
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }
        for ($i=0; $i<count($agentData); $i++){
            $agentData[$i]->index = $i+1;
            $theId = $agentData[$i]->id;
            $transaction = DB::table('agent_commission')
                ->select('agent_commission.*')
                ->where('agent_commission.agent_id','=',$theId)
                ->get()->count();
            $agentData[$i]->transactionCount = $transaction;
        }
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

        $result = $agentData;
        $json = [
            "data"=>$result,
            "show"=>DB::getSchemaBuilder()->getColumnListing($this->tableName),
        ];
        return $this->composeSuccessJSON($json);
    }

}
