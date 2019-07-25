<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgentTaxTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_tax', function (Blueprint $table) {
            $table->increments('id');
            $table->string('agent_id');
            $table->string('transaction_id');
            $table->string('invoice_id');
            $table->decimal('tax_number', 14, 0);
            $table->string('type');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('office_tax', function (Blueprint $table) {
            $table->increments('id');
            $table->string('office_id');
            $table->string('transaction_id');
            $table->string('invoice_id');
            $table->decimal('tax_number', 14, 0);
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
        Schema::dropIfExists('agent_tax');
        Schema::dropIfExists('office_tax');
    }
}
