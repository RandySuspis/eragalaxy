<?php

namespace Modules\M02PropertyAgent\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\DB;
use Modules\M00Base\Http\Controllers\Base as Base;
use Modules\M00Base\Entities\DefaultSetting;
use Modules\M02PropertyAgent\Entities\BranchOffice;
use Modules\M02PropertyAgent\Entities\PrimaryProject;
use Modules\M02PropertyAgent\Entities\PrimaryProjectCoordinator;
use Modules\M02PropertyAgent\Entities\PropertyAgent;
use Modules\M03PropertyTransaction\Entities\AgentCommission;
use Modules\M03PropertyTransaction\Entities\BonusCommission;
use Modules\M03PropertyTransaction\Entities\Tax;
use Modules\M03PropertyTransaction\Entities\TransactionProperty;
use Modules\M03PropertyTransaction\Entities\TransactionPropertyPending;
use Modules\M03PropertyTransaction\Entities\AgentTax;
use Modules\M03PropertyTransaction\Entities\OfficeTax;

class PropertyAgentController extends Base\CRUDReactController
{
    // GLOBAL DATA
    protected $moduleBaseUrl = 'agent';
    protected $moduleName = 'PropertyAgent';
    protected $tableName = 'property_agent';
    // LIST & DETAIL DATA
    protected $hide = [];
//    protected $show = ['id','name','parent_agent_name','grand_parent_agent_name','office_name','action'];
//    protected $showLabel = ['id','Agent Name','Parent Agent','Grand Parent','Office',' '];
//    protected $showWidth = ['col-sm-1','col-sm-3','col-sm-2','col-sm-2','col-sm-2','col-sm-1'];

    protected $show = ['name','registration_number', 'level', 'phone1', 'mgm',
        'business_manager_name', 'office_name', 'action'];
    protected $showLabel = ['Nama MA', 'No Id', 'Jenjang', 'No Telp', 'MGM',
        'SPV', 'Office', 'action'];
    protected $showWidth = ['col-sm-2','col-sm-1','col-sm-1',
        'col-sm-1','col-sm-2','col-sm-2','col-sm-2','col-sm-1'];

    // ADD & EDIT DATA

    public function _columnStructure()
    {
        $call = [
            "name" => PropertyAgent::getStructureWithName("name"),
            "office_id" => PropertyAgent::getStructureWithName('office_id'),
            "agent_level_id" => PropertyAgent::getStructureWithName('agent_level_id'),
            "phone1" => PropertyAgent::getStructureWithName('phone1'),
            "phone2" => PropertyAgent::getStructureWithName('phone2'),
            "npwp" => PropertyAgent::getStructureWithName('npwp'),
            "notes" => PropertyAgent::getStructureWithName('notes'),
            "parent_agent_id" => PropertyAgent::getStructureWithName('parent_agent_id'),
            "business_manager_id" => PropertyAgent::getStructureWithName('business_manager_id'),

            "join_date" => PropertyAgent::getStructureWithName("join_date"),
            "exit_date" => PropertyAgent::getStructureWithName("exit_date"),

        ];

        return $call;
    }

    public function _beforeUpdateAction(array $data)
    {
        $data['agent_id'] = 1;
        $data['user_id'] = 1;
        return $data;
    }

    public function _beforeCreateAction(array $data)
    {
        $dateJoin = str_replace('/', '-', $data['join_date']);
        $data['join_date'] = date('Y-m-d', strtotime($dateJoin));

        $dateExit = str_replace('/', '-', $data['exit_date']);
        $data['exit_date'] = date('Y-m-d', strtotime($dateExit));


        $data["registration_number"] = "20191";

        if ($data["parent_agent_id"]) {
            $agent = PropertyAgent::find($data["parent_agent_id"]);
            $data["parent_agent_name"] = $agent->name;

            if ($agent->parent_agent_id) {
                $grandParent = PropertyAgent::find($agent->parent_agent_id);
                $data["grand_parent_agent_name"] = $grandParent->name;
                $data["grand_parent_agent_id"] = $grandParent->id;
            }
        }

        if ($data["business_manager_id"]) {
            $agent = PropertyAgent::find($data["business_manager_id"]);
            $data["business_manager_name"] = $agent->name;
        }

        return $data;
    }

    public function _baseSQLForController()
    {
        $sql = DB::table('property_agent as agent')
            ->join('branch_office as office', 'agent.office_id', 'office.id')
            ->select(
                'agent.id',
                'agent.updated_at',
                'agent.name',
                'registration_number',
                'parent_agent_name',
                'grand_parent_agent_name',
                'office.name as office_name',
                'business_manager_name'
            );
        return $sql;
    }

    /* -----------  View OverRide ------------------- */

    public function list(Request $request, $page = 0)
    {
        $search = $request->input('search');
        return view("base::baseCRUDReact/formList")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'csrf_token' => "'".csrf_token()."'",
                'mainId'=> "propertyAgentList",
                'page'  => $page,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'search'=> "'".$search."'"
            ]
        ]);
    }

    public function report(Request $request, $page = 0){
        self::checkPermissionRead($this->moduleBaseUrl);
        return view("base::baseCRUDReact/formReport")->with([
            "show"=>$this->_showColumn(),
            "moduleBaseUrl"=>$this->moduleBaseUrl,
            "JS"=>[
                'mainId'=> "propertyAgentReport",
                'page'  => $page,
                'limit' => 10,
                'show'  => json_encode($this->_showColumn()),
                'showLabel' => json_encode($this->_showColumn()),
                'baseUrl'=> "'$this->moduleBaseUrl'",
                'csrf_token' => "'".csrf_token()."'",
            ]
        ]);
    }

    public function apiList(Request $request)
    {
        $sql = $this->_baseSQLForController();
        if (isset($request->search) && isset($request->search['value'])) {
            $searchKeyword = $request->search['value'];
            $sql->orWhere('agent.name', 'like', "%$searchKeyword%");
            $sql->orWhere('office.name', 'like', "%$searchKeyword%");
        }
        $sql->orderBy("agent.created_at", "desc");

        $result = $this->apiListCreator($request, $sql, false, false, false);
        foreach ($result['data'] as $data) {
            $data->level = "coordinator";
            $array = [];
            if ($data->parent_agent_name != null) {
                array_push($array, $data->parent_agent_name);
            }
            if ($data->grand_parent_agent_name != null) {
                array_push($array, $data->grand_parent_agent_name);
            }

            $data->mgm = $array;
        }
        return response()->json($result, 200);
    }

    public function apiDetail(Request $request)
    {
        $sql = DB::table('property_agent as agent')
            ->join('branch_office as office', 'agent.office_id', 'office.id')
            ->select('agent.*', 'office.name as office_name') ;
        $id = $request->input('id');
        $result = $this->apiDetailCreator($id, "agent.id", $sql, false, true);
        $data = $result['data'];

        $data->level = "coordinator";
        $array = [];
        if ($data->parent_agent_name != null) {
            array_push($array, $data->parent_agent_name);
        }
        if ($data->grand_parent_agent_name != null) {
            array_push($array, $data->grand_parent_agent_name);
        }

        $data->mgm = $array;
        $data->spv = $array;

        return response()->json($result, 200);
    }

    /* -----------  PRIVATE FUNCTION  ------------------- */

    protected function getLevelAgentData(Request $request)
    {
        $search = $request->searchText?$request->searchText:"";
        $searchId = $request->searchId;

        $result = DB::table("level_agent")->select("id as value", "name as label");
        if (strlen($search)>0) {
            $result = $result->where('name', 'like', "%$search%");
        }
        if ($searchId) {
            $result = $result->orWhere('id', $searchId);
        }

        $result = $result->get();
        $formattedResult = [
            'data' => $result
        ];
        return response()->json($result);
    }

    protected function getOfficeData(Request $request)
    {
        $search = $request->searchText?$request->searchText:"";
        $searchId = $request->searchId;

        $result = DB::table("branch_office")->select("id as value", "name as label");
        if (strlen($search)>0) {
            $result = $result->where('name', 'like', "%$search%");
        }
        if ($searchId) {
            $result = $result->orWhere('id', $searchId);
        }
        $result = $result->take(15);
        $result = $result->get();
        $formattedResult = [
            'data' => $result
        ];
        return response()->json($result);
    }

    protected function getAgentData(Request $request)
    {
        $search = $request->searchText;
        $result = DB::table("property_agent")->select("id as value", "name as label");
        if (strlen($search)>0) {
            $result = $result->where('name', 'like', "%$search%");
        }
        $result = $result->take(15);
        $result = $result->get();
        return response()->json($result);
    }

    protected function getAgentBMData(Request $request)
    {
        $search = $request->searchText;
        $result = DB::table("property_agent")
            ->select("property_agent.id as value", "property_agent.name as label")
            ->join("level_agent", "level_agent.id", "property_agent.agent_level_id")
            ->where("level_agent.id", 2);

        if (strlen($search)>0) {
            $result = $result->where('property_agent.name', 'like', "%$search%");
        }
        $result = $result->take(15);
        $result = $result->get();
        return response()->json($result);
    }

    protected function getPrimaryProjectData(Request $request)
    {
        $search = $request->searchText;
        $result = DB::table("primary_project")
            ->select("id as value", "project_name as label");
        if (strlen($search)>0) {
            $result = $result->where('project_name', 'like', "%$search%");
        }
        $result = $result->take(15);
        $result = $result->get();
        return response()->json($result);
    }


    // ----------- TRANSACTION RELATED --------------------
    protected function getTransactionRelatedData()
    {
        $result = [];


        // get the Tax Comission Data (PPH_1, PPH_2, PPH_3, PPH_4, PPN, )
        $taxSetting = Tax::all();
        $defaultSetting = DefaultSetting::where("key","mg_fee")->first();

        $taxData = [];
        foreach ($taxSetting as $tax) {
            $taxData[$tax->name] = $tax->percentage;
        }
        $result["taxData"] = $taxData;

        $result["mgfee"] = $defaultSetting->value_setting;


        return response()->json($result, 200);
    }

    protected function getPropertyTransactionRelatedData(Request $request)
    {
        $result = [];
        $currentProperty = PrimaryProject::find($request->propertyId);
        $listerAgent = PropertyAgent::find($currentProperty->agent_lister_id);

        $listerData = [];
        $listerData["name"] = $listerAgent->name;
        $listerData["id"] = $listerAgent->id;
        $listerData["percent"] = $currentProperty->percent_listing_commission;

        $coordinators = PrimaryProjectCoordinator::where("primary_project_id", $currentProperty->id)->get();

        $coorResult = [];
        foreach ($coordinators as $coor) {
            $coo = [];
            $coo ["name"] = $coor->agent_name;
            $coo ["id"] = $coor->id;
            $coo ["percent"] = $coor->percent_commission;
            array_push($coorResult, $coo);
        }

        $result["coordinator"] = $coorResult;
        $result["lister"] = $listerData;

        return response()->json($result, 200);
    }

    protected function getAgentTransactionRelatedData(Request $request)
    {
        /*
         * 1. Related Agent Data
         *  a. get Agent Percent Commission
         *  b. Parent Bonus
         *  c. BD MD bonus
         * 2. Related Property Bonus
         *  a. Lister, Koordinator Bonus
         * */

        $agentId = $request->propertyAgentData;
        $propertyId = $request->propertyId;
        $currentCommission = $request->currentCommission ? $request->currentCommission : "5000000000";
        $propertyPrice = str_replace(".",  "", $request->propertyValue."");
        $percentCommission = str_replace("%", "", $request->percentCommission."");
        $biayaLain1 = !empty($request->biaya_lain_1) ? str_replace(".",  "", $request->biaya_lain_1.""):0;
        $biayaLain2 = !empty($request->biaya_lain_2) ? str_replace(".",  "", $request->biaya_lain_2.""):0;
        $biayaLain3 = !empty($request->biaya_lain_3) ? str_replace(".",  "", $request->biaya_lain_3.""):0;
        $result = $this->calculateTransactionData($biayaLain1, $biayaLain2, $biayaLain3, $propertyPrice, $percentCommission, 0, $propertyId, $agentId);
        return response()->json($result, 200);
    }

    protected function createInvoiceNumber($agent_id, $transactionDate, $lastTransactionNumber, $isPrimary)
    {
        // Invoice Id = OfficeId-AgentId-Date-Number
        if (isset($transactionDate)) {
            $transactionDate = date("dmy");
        }

        $agent = PropertyAgent::find($agent_id);
        $officeId = str_pad($agent->office_id, 2, "0", STR_PAD_LEFT);
        $agentId = str_pad($agent->registration_number, 4, "0", STR_PAD_LEFT);

        $totalList = str_pad($lastTransactionNumber, 3, "0", STR_PAD_LEFT);
//        $date = date_format($transactionDate,"Y/m/d");
        $type = $isPrimary?"P":"S";
        $invoice = $officeId .".". $agentId .".". $transactionDate .$type. $totalList;

        return $invoice;
    }

    protected function saveTransactionData(Request $request)
    {
        /*
        * 1. Form 1
        *  a. Start to write the percent commission (Commission Gross)
        *  b. start to commission fee (the 5.5%)
        * 2. Form 2
        *  a. Calculate Agent Commission (Tax PPH as well)
        *  b. Calculate Office Commission ()
        *  c. Calculate Bonus Commission
        * 3. create Invoice number
        *  a.
        * 4. Start to input to database
        *  a. Save to Transaction or pending transaction depends on the "Cair"
        *  b. Save Agent Tax - including bonus commissionTax
        *  c. Save Office Tax
        *  d. Save bonus Commission
        * */

        $form1 = $request->form1;
        $form1 = json_decode($form1);
        $form2 = $request->form2;
        $formData = $form2;
        $form2 = json_decode($form2);

        $transactionDate = Carbon::createFromFormat('d-m-Y', $form1->date);

        $agentId = $form1->agent_id;
        $propertyPrice = str_replace(".", "", $form1->property_value."");
        $percentCommission = str_replace("%", "", $form1->percent_commission."");
        $propertyNote = isset($form1->property_note)?$form1->property_note:"No Description";
        $subsidiPercent = isset($form2->subsd)?(int)$form2->subsd:0;
        $propertyId = isset($form1->property_id)?(int)$form1->property_id:null;
        $biaya_lain_1 = !empty($form1->biaya_lain_1)?str_replace(".", "", $form1->biaya_lain_1.""):0;
        $biaya_lain_2 = !empty($form1->biaya_lain_2)?str_replace(".", "", $form1->biaya_lain_2.""):0;
        $biaya_lain_3 = !empty($form2->biaya_lain_3)?str_replace(".", "", $form2->biaya_lain_3.""):0;

        $result = $this->calculateTransactionData($biaya_lain_1, $biaya_lain_2, $biaya_lain_3, $propertyPrice, $percentCommission, $subsidiPercent, $propertyId, $agentId);
        $commissionData= $result["commissionData"];
        $bonusData= $result["bonusData"];

        // ======== CREATE INVOICE ID =====================
        $transactionAgent = PropertyAgent::find($agentId);

        $from = Carbon::today()->toDateTimeString();
        $to = Carbon::tomorrow()->toDateTimeString();
        // use agent commission as there's many type of transaction in different table (primary, secondary, kpr, blt dkk)
        $totalTransactionToday = AgentCommission::whereBetween('created_at', [$from, $to])->get();
        $isPrimary = false;
        if (isset($form1->property_id)) {
            $isPrimary = true;
        }
        $invoiceId = $this->createInvoiceNumber($agentId, date("dmy"), count($totalTransactionToday), $isPrimary);
        if ($form2->langsungCair == 1) {
            $transactionId = TransactionProperty::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "office_id"=> $transactionAgent->office_id,
                "property_id"=> $propertyId,
                "property_value"=> $propertyPrice,
                "payment_date"=> $transactionDate,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> true,
                "property_percent"=> $percentCommission,
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "property_note"=> $propertyNote,
                "biaya_lain_1"=> $biaya_lain_1,
                "biaya_lain_2"=> $biaya_lain_2,
                "biaya_lain_3"=> $biaya_lain_3,
                "formData" => $formData,
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString(),
            ]);

            $propertyId = null;
            if (isset($form1->property_id)) {
                $propertyId = $form1->property_id;
            }

            // ========= Calculate Bonus Commission ============
            $bonus = $form2->bonus;
            foreach ($bonusData as $bonusKey => $bonus) {
                // Save each bonus to each person
                BonusCommission::create([
                    "invoice_id"=> $invoiceId,
                    "transaction_id"=> $transactionId,
                    "agent_id"=> $bonus['id'],
                    "property_id"=> $propertyId?$propertyId:0,
                    "bonus_commission"=> $bonus['bonus_value'],
                    "type"=> $bonus['label'],
                ]);
            }

            // ========= Calculate Agent Commission ============
            AgentCommission::create([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "commission_gross"=> $commissionData['commission_gross'],
                "pph_value"=> $commissionData['pph_total'],
                "commission_net"=> $commissionData['commission_net'],
                "type"=> "Komisi",
            ]);

            // ========= Populate Tax ============
            AgentTax::create([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['pph_total'],
                "type"=> "PPH",
            ]);

            OfficeTax::create([
                "office_id"=> $transactionAgent->office_id,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['ppn_number'],
                "type"=> "PPN",
            ]);
        }else{
            $termin1 = $form2->termin_1;
            $termin1Percent = $termin1->percent;
            $termin1DateStr = $termin1->date;
            $termin1Date = Carbon::createFromFormat('d-m-Y', $termin1DateStr);
            $termin2 = $form2->termin_2;
            $termin2Percent = $termin2->percent;
            $termin2DateStr = $termin2->date;
            $termin2Date = Carbon::createFromFormat('d-m-Y', $termin2DateStr);

            $transactionId = TransactionPropertyPending::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "office_id"=> $transactionAgent->office_id,
                "property_id"=> $propertyId,
                "property_value"=> $propertyPrice,
                "payment_date"=> $termin1Date,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> false,
                "property_percent"=> $percentCommission*($termin1Percent/100),
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString()
            ]);

            $transactionId = TransactionPropertyPending::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "property_id"=> $propertyId,
                "office_id"=> $transactionAgent->office_id,
                "property_value"=> $propertyPrice,
                "payment_date"=> $termin2Date,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> false,
                "property_percent"=> $percentCommission*($termin2Percent/100),
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString()
            ]);
        }

        return "success";
    }

    protected function updateTransactionData(Request $request)
    {
        /*
        * 1. Form 1
        *  a. Start to write the percent commission (Commission Gross)
        *  b. start to commission fee (the 5.5%)
        * 2. Form 2
        *  a. Calculate Agent Commission (Tax PPH as well)
        *  b. Calculate Office Commission ()
        *  c. Calculate Bonus Commission
        * 3. create Invoice number
        *  a.
        * 4. Start to input to database
        *  a. Save to Transaction or pending transaction depends on the "Cair"
        *  b. Save Agent Tax - including bonus commissionTax
        *  c. Save Office Tax
        *  d. Save bonus Commission
        * */

        $form1 = $request->form1;
        $form1 = json_decode($form1);
        $form2 = $request->form2;
        $formData = $form2;
        $form2 = json_decode($form2);
        $transactionId = $request->theId;

        $transactionDate = Carbon::createFromFormat('d-m-Y', $form1->date);

        $agentId = $form1->agent_id;
        $propertyPrice = str_replace(".", "", $form1->property_value."");
        $percentCommission = str_replace("%", "", $form1->percent_commission."");
        $propertyNote = isset($form1->property_note)?$form1->property_note:"No Description";
        $subsidiPercent = isset($form2->subsd)?(int)$form2->subsd:0;
        $propertyId = isset($form1->property_id)?(int)$form1->property_id:null;
        $biaya_lain_1 = !empty($form1->biaya_lain_1)?str_replace(".", "", $form1->biaya_lain_1.""):0;
        $biaya_lain_2 = !empty($form1->biaya_lain_2)?str_replace(".", "", $form1->biaya_lain_2.""):0;
        $biaya_lain_3 = !empty($form2->biaya_lain_3)?str_replace(".", "", $form2->biaya_lain_3.""):0;

        $result = $this->calculateTransactionData($biaya_lain_1, $biaya_lain_2, $biaya_lain_3, $propertyPrice, $percentCommission, $subsidiPercent, $propertyId, $agentId);
        $commissionData= $result["commissionData"];
        $bonusData= $result["bonusData"];

        // ======== CREATE INVOICE ID =====================
        $transactionAgent = PropertyAgent::find($agentId);

        $from = Carbon::today()->toDateTimeString();
        $to = Carbon::tomorrow()->toDateTimeString();
        // use agent commission as there's many type of transaction in different table (primary, secondary, kpr, blt dkk)
        $totalTransactionToday = AgentCommission::whereBetween('created_at', [$from, $to])->get();
        $isPrimary = false;
        if (isset($form1->property_id)) {
            $isPrimary = true;
        }
        $invoiceId = isset($form1->transaction_number)? $form1->transaction_number:$this->createInvoiceNumber($agentId, date("dmy"), count($totalTransactionToday), $isPrimary);
        if ($form2->langsungCair == 1) {
            TransactionProperty::whereId($transactionId)->update([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "office_id"=> $transactionAgent->office_id,
                "property_id"=> $propertyId,
                "property_value"=> $propertyPrice,
                "payment_date"=> $transactionDate,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> true,
                "property_percent"=> $percentCommission,
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "property_note"=> $propertyNote,
                "biaya_lain_1"=> $biaya_lain_1,
                "biaya_lain_2"=> $biaya_lain_2,
                "biaya_lain_3"=> $biaya_lain_3,
                "formData" => $formData
            ]);

            $propertyId = null;
            if (isset($form1->property_id)) {
                $propertyId = $form1->property_id;
            }

            // ========= Calculate Bonus Commission ============
            $bonus = $form2->bonus;
            foreach ($bonusData as $bonusKey => $bonus) {
                $theId = BonusCommission::where("invoice_id","=",$invoiceId)->where("type","=",$bonus['label'])->get('id');
                // Save each bonus to each person
                BonusCommission::whereId($theId)->update([
                    "invoice_id"=> $invoiceId,
                    "transaction_id"=> $transactionId,
                    "agent_id"=> $bonus['id'],
                    "property_id"=> $propertyId?$propertyId:0,
                    "bonus_commission"=> $bonus['bonus_value'],
                    "type"=> $bonus['label'],
                ]);
            }

            // ========= Calculate Agent Commission ============
            $theId = AgentCommission::where("invoice_id","=",$invoiceId)->get('id');
            AgentCommission::whereId($theId)->update([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "commission_gross"=> $commissionData['commission_gross'],
                "pph_value"=> $commissionData['pph_total'],
                "commission_net"=> $commissionData['commission_net'],
                "type"=> "Komisi",
            ]);

            // ========= Populate Tax ============
            $theId = AgentTax::where("invoice_id","=",$invoiceId)->get('id');
            AgentTax::whereId($theId)->update([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['pph_total'],
                "type"=> "PPH",
            ]);

            $theId = OfficeTax::where("invoice_id","=",$invoiceId)->get('id');
            OfficeTax::whereId($theId)->update([
                "office_id"=> $transactionAgent->office_id,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['ppn_number'],
                "type"=> "PPN",
            ]);
        }else{
            $termin1 = $form2->termin_1;
            $termin1Percent = $termin1->percent;
            $termin1DateStr = $termin1->date;
            $termin1Date = Carbon::createFromFormat('d-m-Y', $termin1DateStr);
            $termin2 = $form2->termin_2;
            $termin2Percent = $termin2->percent;
            $termin2DateStr = $termin2->date;
            $termin2Date = Carbon::createFromFormat('d-m-Y', $termin2DateStr);

            $transactionId = TransactionPropertyPending::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "office_id"=> $transactionAgent->office_id,
                "property_id"=> $propertyId,
                "property_value"=> $propertyPrice,
                "payment_date"=> $termin1Date,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> false,
                "property_percent"=> $percentCommission*($termin1Percent/100),
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString()
            ]);

            $transactionId = TransactionPropertyPending::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "property_id"=> $propertyId,
                "office_id"=> $transactionAgent->office_id,
                "property_value"=> $propertyPrice,
                "payment_date"=> $termin2Date,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> false,
                "property_percent"=> $percentCommission*($termin2Percent/100),
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString()
            ]);
        }

        return "success";
    }

    protected function processPendingTransaction(Request $request)
    {
        /*
            * 1. Get All Pending Transaction Today
            *  a. Start to write the percent commission (Commission Gross)
            *  b. start to commission fee (the 5.5%)
            * 2. Move Pending Transaction To Real Commission
            *  a. Calculate Agent Commission (Tax PPH as well)
            *  b. Calculate Office Commission ()
            *  c. Calculate Bonus Commission
            * 3. Calculate Business commission
            *   a.
         */

        $to = Carbon::tomorrow()->toDateTimeString();
        // use agent commission as there's many type of transaction in different table (primary, secondary, kpr, blt dkk)
        $pendingTransactionToday = TransactionPropertyPending::where('payment_date',"<", $to)->get();

        // MOVE PENDING TRANSACTION TO REAL TRANSACTION
        foreach ($pendingTransactionToday as $pendingTransaction) {
            $propertyValue = $pendingTransaction->property_value;
            $propertyPercent = $pendingTransaction->property_percent;
            $subsidi= $pendingTransaction->office_subsidy_percent;
            $propertyId = $pendingTransaction->property_id;
            $agentId = $pendingTransaction->agent_id;
            $officeId = $pendingTransaction->office_id;
            $invoiceId = $pendingTransaction->invoice_id;
            $transactionDate = $pendingTransaction->transaction_date;
            $paymentDate = $pendingTransaction->payment_date;

            $transactionAgent = PropertyAgent::find($pendingTransaction->agent_id);

            $result = $this->calculateTransactionData($propertyValue, $propertyPercent, $subsidi, $propertyId, $agentId);
            $commissionData = $result["commissionData"];
            $bonusData = $result["bonusData"];
            $transactionId = TransactionProperty::insertGetId([
                "invoice_id"=> $invoiceId,
                "agent_id"=> $agentId,
                "office_id"=> $officeId,
                "property_id"=> $propertyId,
                "property_value"=> $propertyValue,
                "payment_date"=> $paymentDate,
                "transaction_date"=> $transactionDate,
                "direct_payment"=> true,
                "property_percent"=> $propertyPercent,
                "gross_commission"=>$commissionData["commission_gross"],
                "mg_fee_percent"=> ($commissionData['mg_fee'] + $commissionData['mg_fee_tax']),
                "mg_fee_number"=> $commissionData['mg_fee_value'],
                "agent_commission_percent"=> $commissionData['percent_commission'],
                "agent_commission_number"=> $commissionData['commission_net'],
                "agent_pph_number"=> $commissionData['pph_total'],
                "agent_end_commission"=> $commissionData['commission_net'],
                "office_commission_percent"=> $commissionData['office_commission'],
                "office_commission_number"=> $commissionData['total_office'],
                "tax_PPN_percent"=> $commissionData['ppn'],
                "tax_PPN_number"=> $commissionData['ppn_number'],
                "office_subsidy_percent"=> $commissionData['subsidi'],
                "office_subsidy_number"=> $commissionData['subsidi_number'],
                "office_end_commission"=> $commissionData['total_office_wo_bonus'],
                "created_at" => Carbon::now()->toDateTimeString(),
                "updated_at" => Carbon::now()->toDateTimeString()
            ]);

            $propertyId = null;
            if (isset($form1->property_id)) {
                $propertyId = $propertyId;
            }

            // ========= Calculate Bonus Commission ============
            foreach ($bonusData as $bonusKey => $bonus) {
                // Save each bonus to each person
                BonusCommission::create([
                    "invoice_id"=> $invoiceId,
                    "transaction_id"=> $transactionId,
                    "agent_id"=> $bonus['id'],
                    "property_id"=> $propertyId?$propertyId:0,
                    "bonus_commission"=> $bonus['bonus_value'],
                    "type"=> $bonus['label'],
                ]);
            }

            // ========= Calculate Agent Commission ============
            AgentCommission::create([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "commission_gross"=> $commissionData['commission_gross'],
                "pph_value"=> $commissionData['pph_total'],
                "commission_net"=> $commissionData['commission_net'],
                "type"=> "Komisi",
            ]);

            // ========= Populate Tax ============
            AgentTax::create([
                "agent_id"=> $agentId,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['pph_total'],
                "type"=> "PPH",
            ]);

            OfficeTax::create([
                "office_id"=> $transactionAgent->office_id,
                "transaction_id"=> $transactionId,
                "invoice_id"=> $invoiceId,
                "tax_number"=> $commissionData['ppn_number'],
                "type"=> "PPN",
            ]);
        }
        $pendingTransactionToday = TransactionPropertyPending::where('payment_date',"<", $to)->delete();

        return "success";
    }

    protected function calculateTransactionData($biayaLain1, $biayaLain2, $biayaLain3, $propertyPrice, $propertyPercentCommission,  $subsidi, $propertyId, $agentId){

        /*
        * 1. Form 1
        *  a. Start to write the percent commission (Commission Gross)
        *  b. start to commission fee (the 5.5%)
        * 2. Form 2
        *  a. Calculate Agent Commission (Tax PPH as well)
        *  b. Calculate Office Commission ()
        *  c. Calculate Bonus Commission
        * 3. create Invoice number
        *  a.
        * 4. Start to input to database
        *  a. Save to Transaction or pending transaction depends on the "Cair"
        *  b. Save Agent Tax - including bonus commissionTax
        *  c. Save Office Tax
        *  d. Save bonus Commission
        * */

        $commissionData = [];
        $currentAgent = PropertyAgent::find($agentId);
        if ($currentAgent == null) {
            return "error";
        }

        if ($propertyPrice == null && $propertyPrice == '') {
            return "error";
        }

        // get management fee & management fee tax
        $mg_fee = DefaultSetting::where("key", "mg_fee")->first();
        $mg_fee_percent = floatval($mg_fee->value_setting);
        $commissionData["mg_fee"] = $mg_fee_percent;
        $mg_fee_tax = DefaultSetting::where("key", "mg_fee_tax")->first();
        $mg_fee_tax_percent = floatval($mg_fee_tax->value_setting);
        $commissionData["mg_fee_tax"] = $mg_fee_tax_percent;

        // Remove the Management Fee
        $commissionWoMgFee = $propertyPrice * ($propertyPercentCommission/100) - $biayaLain1;
        $mgfeeValue = $commissionWoMgFee * (($mg_fee_percent+$mg_fee_tax_percent) /100);
        $commissionData["mg_fee_value"] = $mgfeeValue;
        $commissionWithMgFee = (int)$commissionWoMgFee - $mgfeeValue - $biayaLain2;
        $commissionData["commission_gross"] = $commissionWoMgFee;

        // ==== GET AGENT PERCENT COMMISSION PROGRESSIVE =====
        $from = $date = Carbon::createFromDate(Carbon::now()->year, 1, 1);
        $to = $date = Carbon::createFromDate((Carbon::now()->year + 1), 1, 1);
        $agentCommissionGross = AgentCommission::whereBetween('created_at', [$from, $to])->where('agent_id', $agentId)->sum("commission_gross");
        $agentCommissionNet = AgentCommission::whereBetween('created_at', [$from, $to])->where('agent_id', $agentId)->sum("commission_net");


        $percentArray = [50, 55, 60, 65];
        // getting the one from formal commission
        $resultCommission = calculateProgressive($agentCommissionGross, $commissionWithMgFee, [300, 600, 900, 1000000], [300, 300, 300, 1000000], $percentArray);
        $totalAgentWoPPH = 0;
        $percentCommission = 0;
        for ($i = 0; $i < count($resultCommission); $i++) {
            $commission = $resultCommission[$i];
            $totalAgentWoPPH = $totalAgentWoPPH + $commission;
            if ($commission != 0) {
                $percentCommission = $percentArray[$i];
            }
        }

        // getting the one from subsidi commission
        $subsidiAgent = $agentCommissionGross * ($subsidi/100);
        $totalAgentWoPPH = $totalAgentWoPPH + $subsidiAgent;


        // ==== GET PPH AGENT COMMISSION PROGRESSIVE =====
        $pphAgent = $this->getPPHTax($agentId, $totalAgentWoPPH);
        $totalPPH = $pphAgent["total"];
        $totalAgentWithPPH = $totalAgentWoPPH - $totalPPH - $biayaLain3;

        $commissionData["commission_net"] = $totalAgentWithPPH;

        // ==== GET OFFICE AGENT COMMISSION ========
        $totalOffice = $commissionWithMgFee - $totalAgentWoPPH;
        $ppn_fee = DefaultSetting::where("key", "ppn_fee")->first();
        $ppn_fee_percent = floatval($mg_fee->value_setting);
        $ppn_value = ($totalOffice * $ppn_fee_percent/100);
        $totalOfficeWithPPN = $totalOffice - $ppn_value;
        $totalOfficeWithSubsidi = $totalOfficeWithPPN - $subsidiAgent;
        $totalOfficeWoBonus = $totalOfficeWithSubsidi; //Randy: perlu ditanyakan apakah bonus dari komisi sebelum atau sesudha ppn

        // ====== START TO COUNT BONUS COMMISSION ==========
        $defaultSetting = DefaultSetting::all();
        $bonusData = [];
        // GET PARENT
        if ($currentAgent->parent_agent_id) {
            $bonusData["mgm1"]= [];
            $bonusData["mgm1"]['label'] = "mgm1";
            $bonusData["mgm1"]['id'] = $currentAgent->parent_agent_id;
            $bonusData["mgm1"]['name'] = $currentAgent->parent_agent_name;
            $bonus = foreachLookfor($defaultSetting, 'key', 'mgm1_bonus');
            $bonusData["mgm1"]['bonus'] = $bonus->value_setting;
            $bonusData["mgm1"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
            $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);
        }

        // GET GRAND PARENT.
        if ($currentAgent->grand_parent_agent_id) {
            $bonusData["mgm2"]= [];
            $bonusData["mgm2"]['label'] = "mgm2";
            $bonusData["mgm2"]['id'] = $currentAgent->grand_parent_agent_id;
            $bonusData["mgm2"]['name'] = $currentAgent->grand_parent_agent_name;
            $bonus = foreachLookfor($defaultSetting, 'key', 'mgm2_bonus');
            $bonusData["mgm2"]['bonus'] = $bonus->value_setting;
            $bonusData["mgm2"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
            $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);
        }

        // GET BRANCH MANAGER BONUS
        if ($currentAgent->business_manager_id) {
            $bonusData["bm1"] = [];
            $bonusData["bm1"]['label'] = "bm1";
            $bonusData["bm1"]['id'] = $currentAgent->business_manager_id;
            $bonusData["bm1"]['name'] = $currentAgent->business_manager_name;
            $bonus = foreachLookfor($defaultSetting, 'key', 'bm1_bonus');
            $bonusData["bm1"]['bonus'] = $bonus->value_setting;
            $bonusData["bm1"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
            $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);

            $bmAgent = PropertyAgent::find($currentAgent->business_manager_id);
            if ($bmAgent->branch_manager_id) {
                $bonusData["bm2"]= [];
                $bonusData["bm2"]['label'] = "bm2";
                $bonusData["bm2"]['id'] = $bmAgent->business_manager_id;
                $bonusData["bm2"]['name'] = $bmAgent->business_manager_name;
                $bonus = foreachLookfor($defaultSetting, 'key', 'bm2_bonus');
                $bonusData["bm2"]['bonus'] = $bonus->value_setting;
                $bonusData["bm2"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
                $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);
            }
        }

        // ==== GET BD MD COMMISSION =====
        $office = BranchOffice::find($currentAgent->office_id);
        if ($office->business_director_id) {
            $bonusData["bd"]= [];
            $bonusData["bd"]['label'] = "bd";
            $bonusData["bd"]['id'] = $currentAgent->grand_parent_agent_id;
            $bonusData["bd"]['name'] = $currentAgent->grand_parent_agent_name;
            $bonus = foreachLookfor($defaultSetting, 'key', 'bd_bonus');
            $bonusData["bd"]['bonus'] = $bonus->value_setting;
            $bonusData["bd"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
            $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);
        }
        if ($office->managing_director_id) {
            $bonusData["md"] = [];
            $bonusData["md"]['label'] = "md";
            $bonusData["md"]['id'] = $currentAgent->grand_parent_agent_id;
            $bonusData["md"]['name'] = $currentAgent->grand_parent_agent_name;
            $bonus = foreachLookfor($defaultSetting, 'key', 'md_bonus');
            $bonusData["md"]['bonus'] = $bonus->value_setting;
            $bonusData["md"]['bonus_value'] = ($totalOffice * $bonus->value_setting/100);
            $totalOfficeWoBonus = $totalOfficeWoBonus - ($totalOffice * $bonus->value_setting/100);
        }

        // ====== CHECKING FOR PRIMARY PROPERTY BONUS =======
        if ($propertyId) {
            $property = PrimaryProject::find($propertyId);
            if ($property) {
                // LOOK FOR LISTER BONUS
                $bonusData["lister"] = [];
                $bonusData["lister"]['label'] = "primarylister";
                $bonusData["lister"]['id'] = $property->agent_lister_id;
                $bonusData["lister"]['name'] = $property->agent_lister_name;
                $bonusData["lister"]['bonus'] = $property->percent_listing_commission;
                $bonusData["lister"]['bonus_value'] = ($totalOffice * $property->percent_listing_commission/100);

                // LOOK FOR COORDINATOR BONUS
                $coordinators = PrimaryProjectCoordinator::where("primary_project_id", $propertyId)->get();
                $coorResult = [];
                $index = 1;
                foreach ($coordinators as $coor) {
                    $bonusData["coor".$index] = [];
                    $bonusData["coor".$index]['label'] = "koor".$index;
                    $bonusData["coor".$index]['id'] = $coor->agent_id;
                    $bonusData["coor".$index]['name'] = $coor->agent_name;
                    $bonusData["coor".$index]['bonus'] = $coor->percent_commission;
                    $bonusData["coor".$index]['bonus_value'] = ($totalOffice * $coor->percent_commission/100);
                    $index++;
                }

            }
        }

        // AGENT
        $commissionData["total_agent"] = $totalAgentWoPPH;
        $commissionData["total_agent_with_pph"] = $totalAgentWithPPH;
        $commissionData["pph"] = $pphAgent["data"];
        $commissionData["pph_total"] = $pphAgent["total"];
        $commissionData["commission_calculate"] = $resultCommission;
        $commissionData["commission_percent"] = $percentArray;
        $commissionData["percent_commission"] = $percentCommission;
        $commissionData["subsidi"] = $subsidi;
        $commissionData["subsidi_number"] = $subsidiAgent;
        // ===== OFFICE
        $commissionData["office_commission"] = 100-$percentCommission;
        $commissionData["total_office"] = $totalOffice;
        $commissionData["total_office_wo_bonus"] = $totalOfficeWoBonus;
        $commissionData["ppn"] = $ppn_fee_percent;
        $commissionData["ppn_number"] = $ppn_value;


        $result["commissionData"] = $commissionData;

        $result["bonusData"] = $bonusData;
        return $result;
    }

    protected function getPPHTax($agentId, $currentCommission)
    {
        $resultPPH = array();
        $from = $date = Carbon::createFromDate(Carbon::now()->year, 1, 1);
        $to = $date = Carbon::createFromDate((Carbon::now()->year + 1), 1, 1);
        $agentCommissionNet = AgentCommission::whereBetween('created_at', [$from, $to])->where('agent_id', $agentId)->sum("commission_net");
        $pphAgentCommission = calculateProgressive($agentCommissionNet, $currentCommission, [50, 250, 500, 1000000], [50, 200, 250, 1000000], [1,2,3,4]);
        $totalPPH = 0;
        for ($i = 0; $i < count($pphAgentCommission); $i++) {
            $commission = $pphAgentCommission[$i];
            $totalPPH = $totalPPH + $commission;
        }
        $resultPPH["total"] = $totalPPH;
        $resultPPH["data"] = $pphAgentCommission;
        return $resultPPH;
    }

}

