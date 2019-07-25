<?php

namespace Modules\M02PropertyAgent\Entities;
use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;

class PropertyAgent extends BaseModel
{
    protected $table = "property_agent";

    public static function getStructure(){
        $structure = [

            'name' => self::createStructureText("name", "First Name", "text", "Masukkan Nama", "required",
                ["class"=>""]),

            'npwp' => self::createStructureText("npwp", "NPWP", "number", "Masukkan npwp", "required|numeric",
                ["class"=>""]),

            'phone1' => self::createStructureText("phone1", "Phone 1", "text", "Masukkan no Telpon", "required|max:255",
                ["class"=>""]),

            'phone2' => self::createStructureText("phone2", "Phone 2", "text", "Masukkan no Telpon", "",
                ["class"=>""]),

            'join_date' => self::createStructureDate("join_date", "Tanggal Masuk", "dd/mm/yyyy", "required"),

            'exit_date' => self::createStructureDate("exit_date", "Tanggal Keluar", "dd/mm/yyyy", ""),

            'office_id' => self::createStructureSelect("office_id", "Kantor", "Nama Kantor", "/agent/getOffice","required"),
            'agent_level_id' => self::createStructureSelect("agent_level_id", "Agent Level", "Agent Level", "/agent/getLevelAgent","required"),

            'parent_agent_id' => self::createStructureSelect("parent_agent_id", "Parent","check Select", "/agent/getAgent","required"),
            'grand_parent_agent_id' => self::createStructureSelect("grand_parent_agent_id", "GrandParent","check Select", "/agent/getAgent",""),

            'business_manager_id' => self::createStructureSelect("business_manager_id", "Business Manager","check Select", "/agent/getAgentBM",""),

            'notes' => self::createStructureTextView("notes", "Catatan","Catatan Agent", "required",[ "class" => "Randy"]),

        ];
        return $structure;
    }




}
