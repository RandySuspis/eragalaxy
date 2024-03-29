<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Illuminate\Http\Request ;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M02PropertyAgent\Entities\BranchOffice as BranchOffice;
use Modules\M02PropertyAgent\Entities\PropertyAgent;

class BranchOfficeController extends Base\CRUDReactController
{
    protected $moduleName = 'PropertyAgent';
    protected $tableName = 'branch_office';
    protected $show = ["id", "name", "address", "phone1", "business_director_name", "managing_director_name", "action"];
    protected $showLabel = ["number", "Office", " ", " ", "Business Director", "Managing Director", ""];
    protected $moduleBaseUrl = 'branch';

    public function _columnStructure()
    {
        return BranchOffice::getStructure();
    }

    public function _beforeCreateAction(array $data)
    {
        parent::_beforeCreateAction($data);
        if ($data["managing_director_id"]){
            $agent = PropertyAgent::find($data["managing_director_id"]);
            $data["managing_director_name"] = $agent->name;
        }

        if ($data["business_director_id"]){
            $agent = PropertyAgent::find($data["business_director_id"]);
            $data["business_director_name"] = $agent->name;
        }

        return $data;
    }

    public function report(Request $request, $page = 0){
        self::checkPermissionRead($this->moduleBaseUrl);
        return view("base::baseCRUDReact/formReport")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "branchOfficeReport",
                'page'  => $page,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }
}
