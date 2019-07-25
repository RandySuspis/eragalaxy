<?php

namespace Modules\M02PropertyAgent\Entities;
use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;


class BranchOffice extends BaseModel
{
    protected $table = "branch_office";
    public $structure = "";
//    protected $hidden = ['password', 'updated_at', 'created_at'];

    public static function getStructure(){
        $structure = [
            'name' => self::createStructureText("name", "Office Name", "text", "Masukkan Nama office", "required", null),
            'address' => self::createStructureText("address", "Address", "text", "Masukkan Alamat", "required", null),

            'phone1' => self::createStructureText("phone1", "Primary Phone", "text", "Masukkan Nomor Telepon", "required", null),
            'phone2' => self::createStructureText("phone2", "Secondary Phone", "text", "Masukkan Nomor Telepon Cadangan", "", null),

            'business_director_id' => self::createStructureSelect("business_director_id", "Branch Director","check Select", "/agent/getAgent","required"),
            'managing_director_id' => self::createStructureSelect("managing_director_id", "Managing Director","check Select", "/agent/getAgent","required"),

            'start_date' => self::createStructureText("start_date", "Start Date", "date", "Tanggal Mulai", "required", null),
            'exit_date' => self::createStructureText("exit_date", "Exit Date", "date", "Tanggal Berakhir", "", null),
        ];
        return $structure;
    }

}
