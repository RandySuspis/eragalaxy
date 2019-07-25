<?php

namespace Modules\M01Login\Entities;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Modules\M00Base\Entities\BaseModel;

use Illuminate\Foundation\Auth\User as Authenticatable;

class MemberRole extends Authenticatable{

    use Notifiable;

    protected $table = "role_users";


    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];


    public function getRoleId() {
        return $this->role_id;
    }
}