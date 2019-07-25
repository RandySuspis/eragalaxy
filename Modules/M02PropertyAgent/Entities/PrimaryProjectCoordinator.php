<?php

namespace Modules\M02PropertyAgent\Entities;

use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;

class PrimaryProjectCoordinator extends BaseModel
{
    protected $table = "primary_project_coordinator";
    protected $fillable = ['primary_project_id','agent_id','agent_name','percent_commission'];
}

