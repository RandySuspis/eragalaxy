<?php

namespace Modules\M02PropertyAgent\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Modules\M00Base\Entities\DefaultSetting;
use Modules\M02PropertyAgent\Entities\PrimaryProject;
use Modules\M02PropertyAgent\Entities\PrimaryProjectCoordinator;
use Modules\M02PropertyAgent\Entities\PropertyAgent;
use Modules\M02PropertyAgent\Entities\LevelAgent;
use Modules\M02PropertyAgent\Entities\BranchOffice;
use Modules\M02PropertyAgent\Entities\SecondaryProject;
use Modules\M03TransactionCommission\Entities\Tax;

class M02PropertyAgentDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // Create Property Agent
        foreach (range(1, 10) as $i) {
            $faker = Faker::create();
            PropertyAgent::create([
                'office_id'=>1,
                'parent_agent_id'=>1,
                'parent_agent_name'=>"$faker->firstName",
                'grand_parent_agent_id'=>2,
                'grand_parent_agent_name'=>"$faker->firstName",
                'agent_level_id'=>1,

                'business_manager_id'=>1,
                'registration_number'=>200,
                'name'=>"$faker->firstName",
                'npwp'=>"$faker->bankAccountNumber",
                'join_date'=>Carbon::parse('2000-01-01'),
                'exit_date'=>Carbon::parse('2000-01-01')
            ]);
        }

        // Create Office
        foreach (range(1, 3) as $i) {
            $faker = Faker::create();
            BranchOffice::create([
                'name'=>"$faker->company",
                'address'=>"$faker->address",
                'phone1'=>"$faker->phoneNumber",
                'phone2'=>"$faker->phoneNumber",
                'start_date'=>Carbon::parse('2019-01-01'),
                'exit_date'=>Carbon::parse('2030-01-01')
            ]);
        }

        // Create Primary Property
        foreach (range(1, 6) as $i) {
            $faker = Faker::create();
            PrimaryProject::create([
                'project_id'=>"shojiLand1",
                'project_name'=>"$faker->company",
                'agent_lister_id'=>"$i",
                'percent_listing_commission'=>5,
                'active'=>true,
                'note'=>"Lorem ipsum sit dolorem, Lorem ipsum sit dolorem, Lorem ipsum sit dolorem, Lorem ipsum sit dolorem, Lorem ipsum sit dolorem, ",
            ]);

            PrimaryProjectCoordinator::create([
                'primary_project_id'=>$i,
                'agent_id'=>1,
                'agent_name'=>"$faker->firstName",
                'percent_commission'=>5
            ]);
        }

        // Create Level Agent
        LevelAgent::create([
            'name'=>"Property Consultant",
            'code'=>"PC",
        ]);
        LevelAgent::create([
            'name'=>"Business Manager",
            'code'=>"BM",
        ]);
        LevelAgent::create([
            'name'=>"Branch Director",
            'code'=>"BD",
        ]);
        LevelAgent::create([
            'name'=>"Management Director",
            'code'=>"MD",
        ]);

        // Create Default Setting
        DefaultSetting::create([
            "key" => "mg_fee",
            "name" => "Management Fee",
            "value_setting" => "5"
        ]);

        DefaultSetting::create([
            "key" => "mg_fee_tax",
            "name" => "Management Fee",
            "value_setting" => "0.5"
        ]);

        DefaultSetting::create([
            "key" => "mgm1_bonus",
            "name" => "Parent Commission",
            "value_setting" => "5"
        ]);

        DefaultSetting::create([
            "key" => "mgm2_bonus",
            "name" => "Grand Parent Commission",
            "value_setting" => "2"
        ]);

        DefaultSetting::create([
            "key" => "bm1_bonus",
            "name" => "Business Manager Default",
            "value_setting" => "5"
        ]);

        DefaultSetting::create([
            "key" => "bm2_bonus",
            "name" => "Sister Business Manager Default",
            "value_setting" => "5"
        ]);

        DefaultSetting::create([
            "key" => "bd_bonus",
            "name" => "Business Director Bonus",
            "value_setting" => "2"
        ]);

        DefaultSetting::create([
            "key" => "md_bonus",
            "name" => "Managing Director Bonus",
            "value_setting" => "1"
        ]);

    }
}
