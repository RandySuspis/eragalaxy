<?php

namespace Modules\M03PropertyTransaction\Entities;

use Illuminate\Database\Eloquent\Model;

class BonusCommission extends Model
{
    protected $table = "transaction_bonus_commission";
    protected $fillable = ['invoice_id', 'transaction_id', 'agent_id', 'property_id', 'bonus_commission', 'type'];
}
