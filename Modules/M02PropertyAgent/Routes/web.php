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


//Route::middleware(["sentinel.auth"])->group(function(){
//    Route::middleware(["sentinel.auth.admin"])->group(function(){
Route::middleware(["auth"])->group(function(){
    urlCreatorHelper("levelAgent", "LevelAgentController");
    urlCreatorHelper("agent", "PropertyAgentController");
});
    Route::get("agent/getOffice", "PropertyAgentController@getOfficeData");
    Route::get("agent/getAgent", "PropertyAgentController@getAgentData");
    Route::get("agent/getAgentBM", "PropertyAgentController@getAgentBMData");
    Route::get("agent/getLevelAgent", "PropertyAgentController@getLevelAgentData");
    Route::get("agent/getPrimaryProject", "PropertyAgentController@getPrimaryProjectData");



Route::middleware(["auth"])->group(function(){
    urlCreatorHelper("branch", "BranchOfficeController");
    urlCreatorHelper("primary", "PrimaryProjectController");
    urlCreatorHelper("secondary", "SecondaryProjectController");

    urlCreatorHelper("transactionprimary", "TransactionPrimaryController");
    urlCreatorHelper("tax", "TaxController");
    urlCreatorHelper("default", "DefaultSettingController");
});
    Route::get("/randy/processPending", "PropertyAgentController@processPendingTransaction");
    Route::get('/agent/getTransactionRelatedData', 'PropertyAgentController@getTransactionRelatedData');
    Route::get('/agent/getTransactionAgentRelatedData', 'PropertyAgentController@getAgentTransactionRelatedData');
    Route::get('/agent/getTransactionPropertyRelatedData', 'PropertyAgentController@getPropertyTransactionRelatedData');
    Route::post('/transaction/saveTransaction', 'PropertyAgentController@saveTransactionData');

