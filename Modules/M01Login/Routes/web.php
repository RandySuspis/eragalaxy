<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Route::prefix('')->group(function () {
    Route::middleware(['guest'])->group(function () {
        Route::get('/');
        Route::get('login', 'LoginController@index')->name("login");
        Route::post('login', 'LoginController@loginPost');
        Route::get('forgotPassword', 'LoginController@forgotPassword');
        Route::post("forgotPassword", "LoginController@forgotPasswordPost");

        Route::get('register', 'LoginController@registerStep1');
        Route::get('register/2', 'LoginController@registerStep2');
        Route::get('register/3', 'LoginController@registerStep3');

        Route::post('register/email', 'LoginController@registerByEmailPost');
        Route::post('register/3', 'LoginController@registerStep2Post');
        Route::post('register/post', 'LoginController@registerStep3Post');

        Route::get('user/resetpassword/{email}/{token}', 'LoginController@resetPasswordLink');
        Route::post('user/resetpassword', 'LoginController@doResetPasswordLink');

        Route::get('login/socialmedia/{provider}', 'SocialMediaController@redirectToProvider');
        Route::get('login/socialmedia/{provider}/callback', 'SocialMediaController@handleProviderCallback');
    });

    Route::get('user/emailverify/{email}/{token}', 'LoginController@emailVerifyLink');

    urlCreatorHelper("role", "RoleController");
    urlCreatorHelper("user", "UserController");

    Route::middleware(["auth"])->group(function(){
        Route::get('logout','LoginController@logout');
        Route::get('profile', 'UserController@profile');

        Route::get('changePassword', 'UserController@changePassword');
        Route::get('editProfile', 'UserController@editProfile');
        Route::post('changePassword', 'UserController@doChangePassword');
        Route::post('editProfile', 'UserController@doEditProfile');
        Route::get('user/benefits', 'UserController@benefits');
    });
});
