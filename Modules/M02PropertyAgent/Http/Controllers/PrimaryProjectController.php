<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Illuminate\Http\Request ;
use Illuminate\Http\Response as Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Entities\BaseModel;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M02PropertyAgent\Entities\PrimaryProject;
use Modules\M02PropertyAgent\Entities\PrimaryProjectCoordinator;
use Modules\M02PropertyAgent\Entities\PropertyAgent;

class PrimaryProjectController extends Base\CRUDReactController
{

    protected $moduleName = 'PropertyAgent';
    protected $moduleBaseUrl = 'primary';
    protected $tableName = "primary_project";
    protected $show = ["show_id","project_name","action"];
    protected $showLabel = ["id","project_name","action"];
    protected $showOrderDefault = 'show_id';
    protected $showOrderDirectionDefault = 'desc';

    public function _columnStructure(){
        $call = [
            "project_name" => PrimaryProject::getStructureWithName("project_name"),
            "agent_lister_id" => PrimaryProject::getStructureWithName('agent_lister_id'),
            "note" => PrimaryProject::getStructureWithName('note'),

            'agent_advisor[0]' => BaseModel::createStructureSelect(
                "agent_advisor[0]",
                "Agent advisor 1",
                "Input",
                "/agent/getAgent",
                "",
                null
            ),

            'agent_advisor[1]' => BaseModel::createStructureSelect(
                "agent_advisor[1]",
                "Agent advisor 2",
                "Input",
                "/agent/getAgent",
                "",
                null
            ),

            'agent_advisor[2]' => BaseModel::createStructureSelect(
                "agent_advisor[2]",
                "Agent advisor 3",
                "Input",
                "/agent/getAgent",
                "",
                null
            ),

            'agent_advisor[3]' => BaseModel::createStructureSelect(
                "agent_advisor[3]",
                "Agent advisor 4",
                "Input",
                "/agent/getAgent",
                "",
                null
            ),
        ];

        return $call;
    }

    public function list(Request $request, $page = 0){
        self::checkPermissionRead($this->moduleBaseUrl);
        $search = $request->input('search');
        return view("base::baseCRUDReact/formList")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "primaryPropertyList",
                'page'  => $page,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'search'=> "'".$search."'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function report(Request $request, $page = 0){
        self::checkPermissionRead($this->moduleBaseUrl);
        return view("base::baseCRUDReact/formReport")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "primaryPropertyReport",
                'page'  => $page,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function viewReportDetail(Request $request, $theId){
        self::checkPermissionRead($this->moduleBaseUrl);
        $data = DB::table($this->tableName)->find($theId);
        if (!$data) {
            abort(404);
        }
        return view("base::baseCRUDReact/formReport")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "primaryPropertyReportDetail",
                'page' => 0,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
                'primary_project_id' => $theId,
            ]
        ]);
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
                'mainId'=> "primaryPropertyCreate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function createAction(Request $request)
    {
        // create validation from structure definition.
        $validate = [];
        foreach ($this->_columnStructure() as $colStructure) {
            if (isset($colStructure['validation'])) {
                $validate[$colStructure['name']] = $colStructure['validation'];
            }
        }
        $request->validate($validate);

        $addData = $request->all();

        $agents = $addData["agent"];

        // Data ini : placeholder, Error & Validation, Label, class, options, masking, ispassword, isdisabled
        $columnsName = DB::getSchemaBuilder()->getColumnListing($this->tableName);
        $colStructure = $this->_columnStructure();
        $data = [];
        foreach ($columnsName as $col) {
            if (isset($addData[$col])) {
                // Start to format the date
                if (isset($colStructure[$col]) && $colStructure[$col]['type'] == 'date') {
                    $formatDate = str_replace('/', '-', $addData[$col]);
                    $data[$col] = date('Y-m-d', strtotime($formatDate));
                } else if (isset($colStructure[$col]) && $colStructure[$col]['type'] == 'datetime') {
                    $formatDate = str_replace('/', '-', $addData[$col]);
                    $data[$col] = date('Y-m-d HH:MM:SS', strtotime($formatDate));
                } else {
                    $data[$col] = $addData[$col];
                }
            }
        }

        // adding time stamp
        $data["created_at"] = new \DateTime();
        $data["updated_at"] = new \DateTime() ;
        $data["active"] = true ;

        // adding project id
        $data['project_id'] = $data['project_name'];
        $propertyId = DB::table($this->tableName)->insertGetId($data);


        // Start to insert the agent data
        if (isset($agents)) {
            foreach ($agents as $agentJSON) {
                $agent =json_decode($agentJSON);
//                $kantorListing = $kantorListing + floatval($agent->percent_commission);

                $dataAgent = [];
                $dataAgent["primary_project_id"] = $propertyId;
                $dataAgent["agent_id"] = $agent->id;
                $agentData = PropertyAgent::find($agent->id);
                $dataAgent["agent_name"] = $agentData->name;
                $dataAgent["percent_commission"] = $agent->percent_commission;
                PrimaryProjectCoordinator::create($dataAgent);
//                DB::table("primary_project_coordinator")->insert($dataAgent);
            }
        }


        return response()->json($data, 200);

    }

    public function edit(Request $request, $theId)
    {
        $data = DB::table($this->tableName)->find($theId);
        if (!$data) {
            abort(404);
        }
        return view("base::baseCRUDReact/formUpdate")->with([
            "typeColumns"=>$this->_getFinalTypeColumn(),
            "inputStructure"=>$this->_columnStructure(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "primaryPropertyUpdate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
                'dataId' =>$theId
            ]
        ]);
    }

    public function editAction(Request $request, $theId)
    {
        // Validation for server side... checking
        $validate = [];
        foreach ($this->_columnStructure() as $colStructure) {
            if (isset($colStructure['validation'])) {
                $validate[$colStructure['name']] = $colStructure['validation'];
            }
        }
        $request->validate($validate);

        $addData = $this->_beforeUpdateAction($request->all());

        // Start count for komisi
        $agents = $addData["agent"];
        $kantorListing = 0;
        if (isset($agents)) {
            foreach ($agents as $agentJSON) {
                $agent =json_decode($agentJSON);
                $kantorListing = $kantorListing + floatval($agent->percent_commission);
            }
        }
//        $kantorSelling = 100 - $kantorListing;
//        $addData['percent_listing_commission'] = $kantorListing;
//        $addData['percent_office_listing_commission'] = $kantorSelling;
//        $addData['percent_selling_commission'] = 0;

        // Data ini : placeholder, Error & Validation, Label, class, options, masking, ispassword, isdisabled
        $columnsName = DB::getSchemaBuilder()->getColumnListing($this->tableName);
        $colStructure = $this->_columnStructure();
        $data = [];
        foreach ($columnsName as $col) {
            if (isset($addData[$col])) {
                // Start to format the date
                if (isset($colStructure[$col]) && $colStructure[$col]['type'] == 'date') {
                    $formatDate = str_replace('/', '-', $addData[$col]);
                    $data[$col] = date('Y-m-d', strtotime($formatDate));
                } else if (isset($colStructure[$col]) && $colStructure[$col]['type'] == 'datetime') {
                    $formatDate = str_replace('/', '-', $addData[$col]);
                    $data[$col] = date('Y-m-d HH:MM:SS', strtotime($formatDate));
                } else {
                    $data[$col] = $addData[$col];
                }
            }
        }

        $update = DB::table($this->tableName)->where('id', $theId)->update($data);

        // delete primary_project_lister data
        $deleted = DB::table("primary_project_coordinator")->where('primary_project_id', $theId)->delete();

        // Start to insert the agent data
        if (isset($agents)) {
            foreach ($agents as $agentJSON) {
                $agent =json_decode($agentJSON);
                $kantorListing = $kantorListing + floatval($agent->percent_commission);

                $dataAgent = [];
                $dataAgent["primary_project_id"] = $theId;
                $dataAgent["agent_lister_id"] = $agent->id;
                $agentData = PropertyAgent::find($agent->id);
                $dataAgent["agent_name"] = $agentData->name;
                $dataAgent["percent_commission"] = $agent->percent_commission;
                DB::table("primary_project_coordinator")->insert($dataAgent);
            }
        }

        $this->_afterUpdateAction($update);

        return response()->json($data, 200);
    }

    public function apiDetail(Request $request)
    {
        $sql = $this->_baseSQLForController();
        $id = $request->input('id');
        $sql = $sql->where("property.id",$id);

        $result = $this->apiDetailCreator($id, "id", $sql, false, false);

        $result["data"]->agent = DB::table("primary_project_coordinator")->select("id","percent_commission")->where("primary_project_id",$id)->get();
        return response()->json($result, 200);
    }

    public function apiList(Request $request)
    {
        $sql = $this->_baseSQLForController();
        if (isset($request->search['value'])) {
            $search = $request->search['value'];
            $sql->orWhere('project_name', 'like', "%$search%");
        }

        $result = $this->apiListCreator($request, $sql, false, false, true);

        foreach ($result['data'] as $item) {
            // get agents
            $agents = DB::table('primary_project_coordinator')->where('primary_project_id', $item->show_id)->get();
            $item->agent = $agents;
        }

        return response()->json($result, 200);
    }

    public function _baseSQLForController(){
        $sql = DB::table("$this->tableName as property")
            ->leftJoin('primary_project_coordinator as lister', 'property.id', 'lister.primary_project_id')
            ->select(
                'property.agent_lister_id',
                'property.note',
                'property.project_name',
                "property.id as show_id",
                 DB::raw('group_concat( concat(lister.agent_name,"(",lister.percent_commission,"%)") separator ",") as agent_name')
            );
        $sql->groupBy('property.agent_lister_id', 'property.project_name', 'property.id',
            'property.note');

        return $sql;
    }


}
