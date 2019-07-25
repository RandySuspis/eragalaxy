<?php

namespace Modules\M00Base\Entities;
use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;


class LogAdmin extends BaseModel
{
    protected $table = "log_admin";
    public $structure = "";
    public $timestamps = true;

}
