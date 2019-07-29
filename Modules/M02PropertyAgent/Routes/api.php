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

Route::middleware('auth:api')->get('/propertyagent', function (Request $request) {
    return $request->user();
});


Route::group(['namespace' => 'API'], function () {

    apiCreatorHelper('agent', 'PropertyAgentAPIController');
    Route::get('agent/getOffice', 'PropertyAgentAPIController@getOfficeData');
    Route::get('agent/report', 'PropertyAgentAPIController@getReportData');

    apiCreatorHelper('branch', 'BranchOfficeAPIController');
    Route::get('branch/report', 'BranchOfficeAPIController@getReportData');

    apiCreatorHelper('primary', 'PrimaryProjectAPIController');
    Route::get('primary/test', 'PrimaryProjectAPIController@indexWithPrimaryLister');
    Route::get('primary/report', 'PrimaryProjectAPIController@getReportData');
    Route::get('primary/report/detail', 'PrimaryProjectAPIController@getReportDetail');

    apiCreatorHelper('secondary', 'SecondaryProjectAPIController');


});