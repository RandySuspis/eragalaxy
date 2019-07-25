<?php

namespace Modules\M01Login\Entities;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Modules\M00Base\Entities\BaseModel;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Member extends Authenticatable{

    use Notifiable;

    protected $table = "users";

    protected $primaryKey = 'id';


    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'email_token', 'password_reset_token', 'api_token'
    ];


    public function getAuthPassword() {
        return $this->password;
    }
}