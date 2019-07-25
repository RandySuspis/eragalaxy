<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionBonusCommissionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_bonus_commission', function (Blueprint $table) {
            $table->increments('id');
            $table->string('invoice_id');
            $table->integer('transaction_id');
            $table->integer('agent_id');
            $table->integer('property_id');
            $table->decimal('bonus_commission',14,0);
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
        Schema::dropIfExists('transaction_bonus_commission');
    }
}
