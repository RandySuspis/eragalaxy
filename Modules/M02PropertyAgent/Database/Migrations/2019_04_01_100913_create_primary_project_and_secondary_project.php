<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrimaryProjectAndSecondaryProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('primary_project', function (Blueprint $table) {
            $table->increments('id');
            $table->string('project_id');
            $table->string('project_name');
            $table->boolean('active')->default(false);

            $table->integer('agent_lister_id')->nullable();
            $table->integer('percent_listing_commission')->nullable();

            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('primary_project_coordinator', function (Blueprint $table){
            $table->increments('id');
            $table->integer('primary_project_id')->nullable();
            $table->integer('agent_id')->nullable();
            $table->string('agent_name')->nullable();
            $table->integer('percent_commission')->nullable();
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
        Schema::dropIfExists('primary_project');
        Schema::dropIfExists('primary_project_coordinator');
    }
}
