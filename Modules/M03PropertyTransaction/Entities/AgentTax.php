<?php

namespace Modules\M03PropertyTransaction\Entities;

use Illuminate\Database\Eloquent\Model;

class AgentTax extends Model
{
    protected $table = "agent_tax";
    protected $fillable = ["agent_id", "transaction_id", "invoice_id", "tax_number", "type"];
}
