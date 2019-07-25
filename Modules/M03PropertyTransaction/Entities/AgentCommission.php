<?php

namespace Modules\M03PropertyTransaction\Entities;

use Illuminate\Database\Eloquent\Model;

class AgentCommission extends Model
{
    protected $table = "agent_commission";
    protected $fillable = ['agent_id', 'transaction_id', 'commission_gross', 'pph_value', 'commission_net', 'type', 'invoice_id'];
}
