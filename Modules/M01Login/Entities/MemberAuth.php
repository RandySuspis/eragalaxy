<?php

namespace Modules\M01Login\Entities;
use Illuminate\Database\Eloquent\Model;
use Modules\M00Base\Entities\BaseModel;


class MemberAuth extends Model
{
    protected $table = "users_auth";
    public $structure = "";

    public $timestamps = false;

}
