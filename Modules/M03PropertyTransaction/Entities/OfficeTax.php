<?php

namespace Modules\M03PropertyTransaction\Entities;

use Illuminate\Database\Eloquent\Model;

class OfficeTax extends Model
{
    protected $table = "office_tax";
    protected $fillable = ["office_id", "transaction_id", "invoice_id", "tax_number", "type"];
}
