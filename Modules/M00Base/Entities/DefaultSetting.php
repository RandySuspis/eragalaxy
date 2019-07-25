<?php

namespace Modules\M00Base\Entities;
use Illuminate\Database\Eloquent\Model;
use \Modules\M00Base\Entities\BaseModel as BaseModel;


class DefaultSetting extends BaseModel
{
    protected $table = "default_setting";
    public $structure = "";
    public $timestamps = true;

}
