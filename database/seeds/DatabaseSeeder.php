<?php

use Illuminate\Database\Seeder;
use Modules\M03PropertyTransaction\Entities\Tax;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        Tax::create([
            'name'=>"PPH21",
            'percentage'=>2,
        ]);
    }
}
