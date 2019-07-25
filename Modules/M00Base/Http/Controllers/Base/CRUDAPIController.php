<?php

namespace Modules\M00Base\Http\Controllers\Base;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Array_;
use Modules\Base\Entities\BaseModel as BaseModel;


class CRUDAPIController extends APIController
{
    protected $moduleBaseUrl = 'base';
    protected $moduleName = 'base';
    protected $tableName = 'table';
    protected $hide = ['id', 'created_at','updated_at'];
    protected $hideSelect = [];
    /* ======================= Controller Setting ==============================*/
    /**
     *
     * @return Array of array
     */
    public function _showColumn()
    {
        return array();
    }

    private function _finalShowColumn(){
        if (count($this->_showColumn())) {
            return $this->_showColumn();
        } else {
            return DB::getSchemaBuilder()->getColumnListing($this->tableName);
        }
    }

    /**
     *
     * @return Array of array
     */
    public function _getTypeColumn()
    {
        return array();
    }

    private function _getFinalTypeColumn(){
        if (count($this->_getTypeColumn())) {
            return $this->_getTypeColumn();
        } else {
            return DB::select("describe $this->tableName");
        }

    }

    public function _baseSQLForController($selectStr = null)
    {
        if ($selectStr != null) $sql = DB::table($this->tableName)->select($selectStr);
        else $sql = DB::table($this->tableName)->select();
        return $sql;
    }

    public function _columnStructure(){
        $columns = DB::select("describe $this->tableName");
        //        dd($columns);
        $result = [];
        $except = [];
        foreach ($columns as $column) {

            $validateStr = "";
            if ($column->Null == "NO") $validateStr = 'required|';
            $data = explode('(' , rtrim($column->Type, ')'));
            if ($data[0] == "int") $validateStr .= "integer|";
            else if ($data[0] == "double" || $data[0] == "float") $validateStr .= 'numeric|';
            else if ($data[0] == "varchar") $validateStr .= 'string|';
            else if ($data[0] == "text") $validateStr .= 'string|';
            else if ($data[0] == "date" || $data[0] == "timestamp") $validateStr .= 'date|';

            if (isset($data[1])) $validateStr .= "max:".$data[1]."|";

            $validateStr = rtrim($validateStr, '|');

            if (!(in_array($column->{'Field'}, $except))) {
                $struct = null;
                if ((strpos($column->{'Type'}, 'int') !== false) ||
                    (strpos($column->{'Type'}, 'double') !== false) ||
                    (strpos($column->{'Type'}, 'float') !== false)) {
                    $struct = BaseModel::createStructureText(
                        $column->{'Field'},
                        $column->{'Field'},
                        'decimal',
                        $column->{'Field'},
                        $validateStr
                    );
                } elseif ((strpos($column->{'Type'}, 'timestamp') !== false) ||
                    (strpos($column->{'Type'}, 'date') !== false)) {
                    $struct = BaseModel::createStructureDate(
                        $column->{'Field'},
                        $column->{'Field'},
                        $column->{'Field'},
                        $validateStr
                    );
                } else {
                    $struct = BaseModel::createStructureText(
                        $column->{'Field'},
                        $column->{'Field'},
                        'text',
                        $column->{'Field'},
                        $validateStr
                    );
                }
                $result[$column->{'Field'}] = $struct;
            }
        }
        return $result;
    }

    /* ======================= CustomAction Setting ==============================*/
    public function _beforeCreateAction()
    {

    }

    public function _afterCreateAction()
    {

    }

    public function _beforeUpdateAction()
    {

    }

    public function _afterUpdateAction()
    {

    }


    /* ======================= CRUD APPLICATION ==============================*/
    public function index(){
        $targetUrl = "/$this->moduleBaseUrl/list";
        return redirect($targetUrl);
    }

    /**
     * Add Base
     * @return Template Add View
     */
    public function list(Request $request){
        $length = 5;
        $start = 0;
        if ($request->has('length')) $length = $request->get('length');
        if ($request->has('start')) $start = $request->get('start');

        $columnType = $this->_getFinalTypeColumn();
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }

        // sort, search, pagination
        $result=$this->_baseSQLForController($selectStr)->skip($start)->take($length)->get();

        $totalCount = $this->_baseSQLForController($selectStr)->get()->count();

        $json = [
            "data"=>$result,
            "show"=>$this->_finalShowColumn(),
            "apiList"=>"/$this->moduleBaseUrl/list/ajax",
            "length"=>$length,
            "start"=>$start,
            "total"=>$totalCount
        ];

        return $this->composeSuccessJSON($json);
    }


    public function read($theId){

        $columnType = $this->_getFinalTypeColumn();
        $selectStr = [];
        for ($i=0; $i<count($columnType); $i++){
            if (!in_array($columnType[$i]->Field, $this->hideSelect)){
                $selectStr[] = $columnType[$i]->Field;
            }
        }

        $result= DB::table($this->tableName)->select($selectStr)->find($theId);
        $json = [
            "data"=>$result,
            "show"=>$this->_finalShowColumn(),
        ];

        return $this->composeSuccessJSON($json);
    }


    /**
     * Add Base
     * @return Template Add View
     */
    public function create(Request $request){
        $validate = [];
        foreach ($this->_columnStructure() as $colStructure){
            if (isset($colStructure['validation'])){
                if (!in_array($colStructure['name'], $this->hide)){
                    $validate[$colStructure['name']] = $colStructure['validation'];
                }
            }
        }

        $request->validate($validate);

        //insert array
        $insertArray = [];
        foreach ($this->_columnStructure() as $colStructure){
            if (!in_array($colStructure['name'], $this->hide)){
                $insertArray[$colStructure['name']] = $request->get($colStructure['name']);
            }
        }

        if (DB::table($this->tableName)->insert($insertArray)){
            $json = [];
            $json['message'] = "success";
            return $this->composeSuccessJSON($json);
        } else{
            $json = [];
            $json['message'] = "failed to insert";
            return $this->composeErrorJSON($json);
        }
    }


    public function update(Request $request, $theId){
        $data = DB::table($this->tableName)->find($theId);
        if ($data){
            $validate = [];
            foreach ($this->_columnStructure() as $colStructure){
                if (isset($colStructure['validation'])){
                    if (!in_array($colStructure['name'], $this->hide)){
                        $validate[$colStructure['name']] = $colStructure['validation'];
                    }
                }
            }
            $request->validate($validate);

            $updateArray = [];
            foreach ($this->_columnStructure() as $colStructure){
                if (!in_array($colStructure['name'], $this->hide)){
                    $updateArray[$colStructure['name']] = $request->get($colStructure['name']);
                }
            }

            if (DB::table($this->tableName)->where('id', $theId)->update($updateArray)){
                $json = [];
                $json['message'] = "success";
                return $this->composeSuccessJSON($json);
            } else{
                $json = [];
                $json['message'] = "Failed to update!";
                return $this->composeErrorJSON($json);
            }
        } else{
            $json = [];
            $json['message'] = "Item not found!";
            return $this->composeErrorJSON($json);
        }

    }

    public function delete(Request $request, $theId){
        $result= DB::table($this->tableName)->find($theId);
        if ($result) {
            if (DB::table($this->tableName)->where('id', $theId)->delete()){
                $json = [];
                $json['message'] = "Success";
                return $this->composeSuccessJSON($json);
            } else{
                $json = [];
                $json['message'] = "Failed to delete!";
                return $this->composeErrorJSON($json);
            }
        } else {
            $json = [];
            $json['message'] = "Data not found!";
            return $this->composeErrorJSON($json);
        }
    }


    public function apiList(Request $request){
        $sql = $this->_baseSQLForController();

        // Check for search condition.
        if (isset($request->search) && isset($request->search['value'])) {
            $searchKeyword = $request->search['value'];
            foreach ($this->_finalShowColumn() as $itemShow) {
                if ($itemShow != "action") {
                    $sql->orWhere($itemShow, 'like', "%$searchKeyword%");
                }
            }
        }

        // Check for sorting condition.
        if (isset($request->order) && isset($request->order[0])) {
            $order = $request->order[0];
            $show = $this->_finalShowColumn();
            $orderColName = $show[$order['column']];
            $orderColDirection = $order['dir'] == 'asc'? 'asc':'desc';
            $sql->orderBy($orderColName, $orderColDirection);
        }

        // Start calling all the data
        $length = $request->length;
        if ($length < 0) {
            $length = 10;
        }
        $result = $sql->skip($request->start)->take($length)->get();
        $resultCount = $sql->skip($request->start)->take($length)->count();
        $totalCount = DB::table($this->tableName)->select()->count();

        $formattedResult = [
            'draw' => $request->draw,
            'recordsTotal' => $totalCount,
            'recordsFiltered' => $totalCount,
            'data' => $result
        ];
        return response()->json($formattedResult, 200);
    }



}
