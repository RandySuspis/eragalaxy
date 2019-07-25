<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionPropertyPendingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_property_pending', function (Blueprint $table) {
            $table->increments('id');
            $table->string('invoice_id');
            $table->integer('agent_id');
            $table->integer('office_id');
            $table->integer("property_id")->nullable();
            $table->date("payment_date");
            $table->date("transaction_date");
            $table->boolean("direct_payment")->default(1);


            $table->decimal("property_value", 14, 0);
            $table->integer("property_percent");

            $table->decimal("gross_commission", 14, 0);

            $table->integer("mg_fee_percent");
            $table->decimal("mg_fee_number", 14, 0);

            // Related With Agent
            $table->integer("agent_commission_percent");
            $table->decimal("agent_commission_number", 14, 0);

            $table->integer("office_subsidy_percent");
            $table->decimal("office_subsidy_number", 14, 0);

            $table->decimal("agent_pph_number", 14, 0);

            $table->decimal("agent_end_commission", 14, 0);
            $table->decimal("office_end_commission", 14, 0);


            // Related with Office
            $table->integer("office_commission_percent");
            $table->decimal("office_commission_number", 14, 0);

            $table->integer("tax_PPN_percent");
            $table->decimal("tax_PPN_number", 14, 0);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction_property_pending');
    }
}
