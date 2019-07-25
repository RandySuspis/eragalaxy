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

}
