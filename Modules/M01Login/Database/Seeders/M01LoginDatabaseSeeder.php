<?php

namespace Modules\M01Login\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Lib\SentryMods\SentryAdminServiceProvider;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Lib\SentryMods\SentryAdmin;

use Illuminate\Support\Facades\DB;

class M01LoginDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // Create the Base User
        $superUser = Sentinel::findById(1);
        if (!$superUser) {
            $credentials = [
                'email'    => 'superadmin@alvonse.com',
                'password' => '123456',
            ];
            $superUser = Sentinel::registerAndActivate($credentials);
        }

        $user = Sentinel::findById(2);
        if (!$user) {
            $credentials = [
                'email' => 'admin@alvonse.com',
                'password' => '112233',
            ];
            $user = Sentinel::registerAndActivate($credentials);
        }

        $guest = Sentinel::findById(3);
        if (!$guest) {
            $credentials = [
                'email' => 'guest@alvonse.com',
                'password' => '112233',
            ];
            $guest = Sentinel::registerAndActivate($credentials);
        }


        // Create the Role
        $role = Sentinel::findRoleBySlug("admin");
        if (!$role) {
            $arrayRole = [
                'slug' => "admin",
                'name' => "admin",
                'permissions' => [
                    'read'   => true,
                    'write' => true,
                    'transaction.write' => false,
                    // any other permissions you want your Subscribers to have
                ]
            ];
            $role = Sentinel::getRoleRepository()->createModel()->create($arrayRole);

            $arrayRoleSuper = [
                'slug' => "superAdmin",
                'name' => "superAdmin",
                'permissions' => [
                    'read'   => true,
                    'write' => true,
                    // any other permissions you want your Subscribers to have
                ]
            ];
            $role = Sentinel::getRoleRepository()->createModel()->create($arrayRoleSuper);

            $arrayRoleGuest = [
                'slug' => "guest",
                'name' => "guest",
                'permissions' => [
                    'read'   => true,
                    'write' => false,
                    'transaction' => false,
                    'primary' => false,
                    // any other permissions you want your Subscribers to have
                ]
            ];
            $role = Sentinel::getRoleRepository()->createModel()->create($arrayRoleGuest);

            // Assign the Role
            $role = Sentinel::findRoleBySlug('admin');
            $role->users()->attach($user);

            $role2 = Sentinel::findRoleBySlug('superAdmin');
            $role2->users()->attach($superUser);

            $role3 = Sentinel::findRoleBySlug('guest');
            $role3->users()->attach($guest);
        }



    }
}
