<?php

namespace Modules\M01Login\Entities;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Modules\M00Base\Entities\BaseModel;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Roles extends Authenticatable{

    use Notifiable;

    protected $table = "roles";

    protected $primaryKey = "id";

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


    public function getRoleName() {
        return $this->name;
    }

    public function getPermission() {
        return $this->permissions;
    }
}