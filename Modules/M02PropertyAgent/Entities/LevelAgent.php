<?php

namespace Modules\M02PropertyAgent\Entities;
use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;


class LevelAgent extends BaseModel
{
    protected $table = "level_agent";
    public $structure = "";
    public $timestamps = true;

//    protected $hidden = ['password', 'updated_at', 'created_at'];

    public static function getStructure(){
        $structure = [

            'name' => self::createStructureText(
                "name",
                "Level Name",
                "text",
                "Masukkan Nama Level",
                "required",
                null
            ),

            'code' => self::createStructureText(
                "code",
                "Code Level",
                "text",
                "Masukkan Code",
                "required|min:2|max:3",
                null
            ),
        ];
        return $structure;
    }


}
