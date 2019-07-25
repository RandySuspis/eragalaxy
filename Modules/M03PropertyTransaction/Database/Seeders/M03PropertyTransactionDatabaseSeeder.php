<?php

namespace Modules\M03PropertyTransaction\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\M03PropertyTransaction\Entities\Tax;

class M03PropertyTransactionDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call("OthersTableSeeder");
        Tax::create([
           "name" => "ppn",
            "percentage" => "1",
        ]);
        Tax::create([
            "name" => "pph_1",
            "percentage" => "1",
        ]);
        Tax::create([
            "name" => "pph_2",
            "percentage" => "2",
        ]);
        Tax::create([
            "name" => "pph_3",
            "percentage" => "3",
        ]);
        Tax::create([
            "name" => "pph_4",
            "percentage" => "4",
        ]);

    }
}
