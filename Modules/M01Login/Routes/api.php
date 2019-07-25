<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/login', function (Request $request) {
     return $request->user();
});


Route::group(['namespace' => 'API'], function () {

    Route::post('user/login', 'LoginAPIController@login');
    Route::post('user/loginSocialMedia', 'LoginAPIController@loginSocialMedia');
    Route::post('user/register', 'LoginAPIController@register');
    Route::post('user/registerSocialMedia', 'LoginAPIController@registerSocialMedia');
    Route::post('user/resetPassword', 'LoginAPIController@resetPassword');

    Route::get('user/getBenefits', 'UserAPIController@getBenefits');

    Route::group(['middleware' => 'auth.api.authenticate'], function(){
        Route::post('user/refreshFCM', 'LoginAPIController@refreshFCM');
        Route::post('user/logout', 'LoginAPIController@logout');
        Route::get('user/getProfile', 'UserAPIController@getProfile');
        Route::post('user/editProfile', 'UserAPIController@editProfile');
        Route::post('user/changePassword', 'UserAPIController@changePassword');
    });

});