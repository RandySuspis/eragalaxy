<?php

namespace Modules\M03PropertyTransaction\Entities;

use Illuminate\Database\Eloquent\Model;

class TransactionPropertyPending extends Model
{
    protected $table = "transaction_property_pending";
    public $timestamps = true;
    protected $fillable = ["invoice_id","property_value","property_percent","mg_fee_percent", "mg_fee_number",
                        "agent_commission_percent", "agent_commission_number", "office_subsidy_percent", "office_subsidy_number",
                        "agent_pph_number", "agent_end_commission", "office_commission_percent", "office_commission_number",
                        "tax_PPN_percent", "tax_PPN_number", "payment_date", "direct_payment", "transaction_date"
                        ];
}
