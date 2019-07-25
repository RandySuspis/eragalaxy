<?php

namespace Modules\M02PropertyAgent\Entities;
use \Modules\M00Base\Entities\BaseModel as BaseModel;
use Illuminate\Database\Eloquent\Model;

class PrimaryProject extends BaseModel
{
    protected $table = "primary_project";

    public function listers()
    {
        return $this->hasmany('Modules\PropertyAgent\Entities\
        PrimaryProjectLister','primary_project_id','id');
    }

    public static function getStructure(){
        $structure = [

            'project_name' => self::createStructureText(
                "project_name",
                "Project Name",
                "text",
                "Masukkan Nama Level",
                "required|min:2",
                null
            ),

            'agent_lister_id' => self::createStructureSelect(
                "agent_lister_id",
                "Agent Lister",
                "Agent Lister",
                "/agent/getAgent",
                "required",
                null
            ),

            'note' => self::createStructureTextView(
                "note",
                "Property Notes",
                "Masukkan Note",
                "required|min:15",
                ['style' =>['width'=>"100%"]]
            )
        ];
        return $structure;
    }

}

