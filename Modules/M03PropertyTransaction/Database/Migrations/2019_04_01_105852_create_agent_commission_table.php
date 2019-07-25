<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgentCommissionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_commission', function (Blueprint $table) {
            $table->increments('id');
            $table->string('agent_id');
            $table->string('transaction_id');
            $table->string('invoice_id');

            $table->decimal('commission_gross', 14, 0);
            $table->integer('pph_value');
            $table->decimal('commission_net', 14, 0);

            $table->string('type');
            
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
        Schema::dropIfExists('agent_commission');
    }
}
