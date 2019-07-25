<?php

namespace RandyModules\Routes;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class RouteM01
{

    public static function funcUp()
    {
        Schema::create('property_agent', function (Blueprint $table) {
            $table->increments('id');

            $table->string('registration_number')->nullable();

            $table->integer('office_id');
            $table->integer('agent_level_id');

            $table->integer('parent_agent_id')->nullable();
            $table->string('parent_agent_name')->nullable();
            $table->integer('grand_parent_agent_id')->nullable();
            $table->string('grand_parent_agent_name')->nullable();

            $table->integer('business_manager_id')->nullable();
            $table->string('business_manager_name')->nullable();


            $table->string('name')->nullable();
            $table->string('phone1')->nullable();
            $table->string('phone2')->nullable();
            $table->string('npwp')->nullable();
            $table->text('notes')->nullable();

            $table->Date('join_date')->nullable();
            $table->Date('exit_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('level_agent', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('branch_office', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->nullable();
            $table->string('address')->nullable();
            $table->string('phone1')->nullable();
            $table->string('phone2')->nullable();
            $table->string('email')->nullable();

            $table->integer('business_director_id')->nullable();
            $table->string('business_director_name')->nullable();
            $table->integer('managing_director_id')->nullable();
            $table->string('managing_director_name')->nullable();

            $table->dateTime('start_date')->nullable();
            $table->dateTime('exit_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('default_setting', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key');
            $table->string('name');
            $table->string('value_setting');
            $table->timestamps();

            $table->engine = 'InnoDB';
        });

        Schema::create('log_admin', function (Blueprint $table) {
            $table->increments('id');
            $table->string('desc');
            $table->timestamp('date');
            $table->timestamps();

            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function funcDown()
    {
        Schema::dropIfExists('property_agent');
        Schema::dropIfExists('level_agent');
        Schema::dropIfExists('branch_office');
        Schema::dropIfExists('default_setting');
        Schema::dropIfExists('log_admin');
    }
}
