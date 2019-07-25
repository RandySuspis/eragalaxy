<?php

namespace Modules\M00Base\Http\Controllers\Base;

use function GuzzleHttp\Psr7\str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Array_;
use Modules\M00Base\Entities\BaseModel as BaseModel;
use Illuminate\Support\Facades\Auth;
use Modules\M01Login\Entities\MemberRole;
use Modules\M01Login\Entities\Roles;

interface ICRUDReactControllerCore
{
    /* ======================= Variable Setting ==============================*/
    /**
     * @return mixed
     */
//    public function _getBaseUrl();
//    public function _getFieldStructure();

    /* ======================= Controller Setting ==============================*/
    public function _showColumn();
    public function _getTypeColumn();
    public function _baseSQLForController();

    /* ======================= CustomAction Setting ==============================*/
    public function _beforeCreateAction();
    public function _afterCreateAction();
    public function _beforeUpdateAction();
    public function _afterUpdateAction();

    /* ======================= CRUDController Implementation ==============================*/
    public function list();
    public function create();
    public function createAction(Request $request);
    public function read($theId);
    public function edit(Request $request, $theId);
    public function editAction(Request $request, $theId);
    public function delete($theId);
    public function deleteAction($theId);

    static function checkPermissionWrite($moduleName);
    static function checkPermissionRead($moduleName);
}


class CRUDReactController extends BaseController
{

    protected $moduleBaseUrl = 'base';
    protected $moduleName = 'base';
    protected $tableName = 'table';
    protected $show = [];
    protected $showLabel = [];
    protected $hide = ['created_at','updated_at','deleted_at'];
    protected $showOrderDefault = 'created_at';
    protected $showOrderDirectionDefault = 'desc';


    /* ======================= Controller Setting ==============================*/
    /**
     *
     * @return array
     */
    public function _showColumn()
    {
        if (count($this->show)){
            $index = 0;
            $result = [];
            foreach ($this->show as $columnName) {
                $labelName = null;
                if (isset($this->showLabel) && isset($this->showLabel[$index])) {
                    $labelName = $this->showLabel[$index];
                }
                $structure = $this->_createShowColumnStructure($columnName, $labelName, isset($this->showWidth[$index])?$this->showWidth[$index]:null);
                array_push($result, $structure);
                $index++;
            }
            return $result;
        } else {
            $columns = DB::getSchemaBuilder()->getColumnListing($this->tableName);
            $except = $this->hide;
            $result = [];
            foreach ($columns as $column) {
                if (!(in_array($column, $except))) {
                    $variable = $this->_createShowColumnStructure($column);
                    array_push($result, $variable);
                }
            }
            $variable = $this->_createShowColumnStructure('action');
            array_push($result, $variable);
            return $result;
        }
    }

    public function _createShowColumnStructure($name, $label = null, $width = null){
        $result = array();
        $result['id'] = $name;
        $result['label'] = $name;
        if ($label != null) {
            $result['label'] = $label;
        }
        if ($width!= null) {
            $result['width'] = $width;
        }

        return $result;
    }

    /**
     *
     * @return Array of array
     */
    public function _getTypeColumn()
    {
        return array();
    }

    public function _getFinalTypeColumn(){
        if (count($this->_getTypeColumn())) {
            return $this->_getTypeColumn();
        } else {
            return DB::select("describe $this->tableName");
        }

    }

    public function _baseSQLForController()
    {
        $sql = DB::table($this->tableName)->select();
        $sql = $sql->OrderBy("created_at","desc");
        return $sql;
    }

    public function _columnStructure(){
        $columns = DB::select("describe $this->tableName");
//        dd($columns);
        $result = [];
        $except = ["created_at", "updated_at", "id","deleted_at"];
        foreach ($columns as $column) {
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
                        'required'
                    );
                } elseif ((strpos($column->{'Type'}, 'timestamp') !== false) ||
                    (strpos($column->{'Type'}, 'date') !== false)) {
                    $struct = BaseModel::createStructureDate(
                        $column->{'Field'},
                        $column->{'Field'},
                        $column->{'Field'},
                        'required'
                    );
                } else {
                    $struct = BaseModel::createStructureText(
                        $column->{'Field'},
                        $column->{'Field'},
                        'text',
                        $column->{'Field'},
                        'required'
                    );
                }
//                dd($column);
                $result[$column->{'Field'}] = $struct;
            }

        }
        return $result;
    }

    /* ======================= CustomAction Setting ==============================*/
    public function _beforeCreateAction(array $data)
    {
        return $data;
    }

    public function _afterCreateAction($insertData)
    {

    }

    public function _beforeUpdateAction(array $data){
        return $data;
    }

    public function _afterUpdateAction($updateData)
    {

    }

    /* ======================= CRUD APPLICATION ==============================*/
    public function index()
    {
        self::checkPermissionRead($this->moduleBaseUrl);
        $targetUrl = "/$this->moduleBaseUrl/list";
        return redirect($targetUrl);
    }

    /**
     * Add Base
     * @return Template Add View
    */
    public function list(Request $request, $page = 0){
        $search = $request->input('search');
        return view("base::baseCRUDReact/formList")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "baseCRUDList",
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

    public function create()
    {
        self::checkPermissionWrite($this->moduleBaseUrl);
//        dd(array_key_exists($temp.".write",$jsonPermission));
        // Data ini : placeholder, Error & Validation, Label, class, options, masking, ispassword, isdisabled
        return view("base::baseCRUDReact/formAdd")->with([
            "typeColumns"=>$this->_showColumn(),
            "inputStructure"=>$this->_columnStructure(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "baseCRUDCreate",
                "inputStructure"=>json_encode($this->_columnStructure()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function createAction(Request $request)
    {
//        dd($request->all());
        // create validation from structure definition.
        $validate = [];
        foreach ($this->_columnStructure() as $colStructure) {
            if (isset($colStructure['validation'])) {
                $validate[$colStructure['name']] = $colStructure['validation'];
            }
        }
        $request->validate($validate);

        $addData = $this->_beforeCreateAction($request->all());

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
            // adding time stamp
            $data["created_at"] = new \DateTime();
            $data["updated_at"] = new \DateTime() ;
        }
        $insert = DB::table($this->tableName)->insert($data);
        return response()->json($data, 200);

//        $this->_afterCreateAction($request, $insert);

//        return redirect("/$this->moduleBaseUrl");
    }

    /**
     * Add Base
     * @return Template Add View
    */
    public function read($theId)
    {
        $data = DB::table($this->tableName)->find($theId);
        if (!$data) {
            abort(404);
        }

        return view("base::baseCRUDReact/formDetail")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "baseCRUDDetail",
                'show'  => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'dataId' =>$theId
            ]
        ]);
    }

    public function edit(Request $request, $theId)
    {
        self::checkPermissionWrite($this->moduleBaseUrl);
        return view("base::baseCRUDReact/formUpdate")->with([
            "typeColumns"=>$this->_getFinalTypeColumn(),
            "inputStructure"=>$this->_columnStructure(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS" => [
                'mainId'=> "baseCRUDUpdate",
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

        $this->_afterUpdateAction($update);

        return response()->json($data, 200);
    }

    public function delete($theId)
    {
        self::checkPermissionWrite($this->moduleBaseUrl);
        $data = DB::table($this->tableName)->find($theId);
        if (!$data) {
            abort(404);
        }
        return view("base::baseCRUDReact/formDelete")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "baseCRUDDelete",
                'show'  => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'dataId' =>$theId,
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function deleteAction($theId)
    {

        $result = DB::table($this->tableName)->find($theId);
        if (!$result) {
            abort(404);
        };

        if ($result) {
            $result = DB::table($this->tableName)->where('id', $theId)->delete();
            $targetUrl = "/$this->moduleBaseUrl/list";
            return redirect($targetUrl);
        } else {
            return "deletePost";
        }
    }

    static function checkPermissionWrite($moduleName)
    {
        $user = Auth::guard()->user();
        $roleId = MemberRole::where('user_id', '=', $user->id)->get()->first()->role_id;
        $rolePermission = Roles::where('id','=',$roleId)->get()->first()->permissions;
        $jsonPermission = json_decode($rolePermission,true);
        if(array_key_exists($moduleName.".write",$jsonPermission)) {
            if (!$jsonPermission[$moduleName.".write"])
                abort(403);
        } else if(array_key_exists($moduleName,$jsonPermission)){
            if (!$jsonPermission[$moduleName])
                abort(403);
        } else {
            if (!$jsonPermission['write'])
                abort(403);
        }
    }

    static function checkPermissionRead($moduleName)
    {
        $user = Auth::guard()->user();
        $roleId = MemberRole::where('user_id', '=', $user->id)->get()->first()->role_id;
        $rolePermission = Roles::where('id','=',$roleId)->get()->first()->permissions;
        $jsonPermission = json_decode($rolePermission,true);
        if(array_key_exists($moduleName.".read",$jsonPermission)) {
            if (!$jsonPermission[$moduleName.".read"])
                abort(403);
        } else if(array_key_exists($moduleName,$jsonPermission)) {
            if (!$jsonPermission[$moduleName])
                abort(403);
        } else {
            if (!$jsonPermission['read'])
                abort(403);
        }
    }

    /* ======================= CRUD APPLICATION API RELATED ==============================*/

    public function apiList(Request $request)
    {
        $result = $this->apiListCreator($request, $this->_baseSQLForController(), true, true, true);
        return response()->json($result, 200);
    }

    public function apiDetail(Request $request)
    {
        $sql = $this->_baseSQLForController();
        $id = $request->input('id');
        $result = $this->apiDetailCreator($id, "id", $sql, true, true);

        return response()->json($result, 200);
    }

    public function apiDetailCreator($key, $columnKey, $baseSql, $callDefaultSelect = true, $callDefaultSearch = true)
    {
        $selected = [];
        if ($callDefaultSelect) {
            $select = $this->_showColumn();
            for ($i = count($select)-1; $i>=0; $i--) {
                $theId = $select[$i]['id'];
                if ($theId != "action") {
                    array_push($selected, $theId);
                }
            }
            $baseSql = $baseSql->select($selected);
        } ;

        // Check for search condition.
        if ($callDefaultSearch) {
            $baseSql = $baseSql->where($columnKey, $key);
        }
        $result = $baseSql->first();
        $formattedResult = [
            'data' => $result
        ];
        return $formattedResult;
    }

    public function apiListCreator($request, $baseSql, $callDefaultSelect = true, $callDefaultSearch = true, $callDefaultSorting = true)
    {
        $sql = $baseSql;

        $totalCount = $baseSql->get()->count();
        $selected = [];
        if ($callDefaultSelect) {
            $select = $this->_showColumn();
            for ($i = count($select)-1; $i>=0; $i--) {
                $theId = $select[$i]['id'];
                if ($theId != "action") {
                    array_push($selected, $theId);
                }
            }
            $sql = $sql->select($selected);
        } ;

        // Check for search condition.
        if ($callDefaultSearch) {
            if (isset($request->search) && isset($request->search['value'])) {
                $searchKeyword = $request->search['value'];
                foreach ($this->_showColumn() as $itemShow) {
                    if ($itemShow['id'] != "action") {
                        $sql->orWhere($itemShow['id'], 'like', "%$searchKeyword%");
                    }
                }
            }
        }
        $filteredResult = $sql->count();

        // Check for sorting condition.
        if ($callDefaultSorting) {
//            $sql->orderBy("created_at", "desc")->orderBy("id", "desc");;
            if (isset($request->order) && isset($request->order[0])) {
                $order = $request->order[0];
                $show = $selected;
                $orderColName = $show[$order['column']];
                $orderColDirection = $order['dir'] == 'asc'? 'asc':'desc';
                $sql->orderBy($orderColName, $orderColDirection);
            } else {
                $sql->orderBy($this->showOrderDefault, $this->showOrderDirectionDefault);
            }
        }


        // Start calling all the data
        $length = $request->length;
        if ($length <= 0) {
            $length = 10;
        }

        $result = $sql->skip($request->start)->take($length)->get();

        $formattedResult = [
            'draw' => $request->draw,
            'recordsTotal' => $totalCount,
            'recordsFiltered' => $filteredResult,
            'data' => $result
        ];
        return $formattedResult;
    }

}
