<?php

function urlCreatorHelper($baseUrl, $controllerName){
    $cname = $controllerName;
    Route::get("$baseUrl/", "$cname@index");

    Route::get("$baseUrl/list", "$cname@list");

    Route::get("$baseUrl/create", "$cname@create");
    Route::post("$baseUrl/create", "$cname@createAction");

    Route::get("$baseUrl/view/{id}", "$cname@read");

    Route::get("$baseUrl/update/{id}", "$cname@edit");
    Route::post("$baseUrl/update/{id}", "$cname@editAction");

    Route::get("$baseUrl/delete/{id}", "$cname@delete");
    Route::post("$baseUrl/delete/{id}", "$cname@deleteAction");


    Route::get("$baseUrl/list/ajax", "$cname@apiList");
    Route::post("$baseUrl/list/ajax", "$cname@apiList");

    Route::get("$baseUrl/detail/ajax", "$cname@apiDetail");
    Route::post("$baseUrl/detail/ajax", "$cname@apiDetail");

    Route::get("$baseUrl/list/{page}", "$cname@list");

}


function apiCreatorHelper($baseUrl, $controllerName){
    $cname = $controllerName;

    Route::get("$baseUrl/list", "$cname@list");
    Route::post("$baseUrl/create", "$cname@createAction");
    Route::get("$baseUrl/view/{id}", "$cname@read");
    Route::post("$baseUrl/update/{id}", "$cname@editAction");
    Route::post("$baseUrl/delete/{id}", "$cname@deleteAction");

    Route::get("$baseUrl/list/ajax", "$cname@apiList");
    Route::post("$baseUrl/list/ajax", "$cname@apiList");

    Route::get("$baseUrl/detail/ajax", "$cname@apiDetail");
    Route::post("$baseUrl/detail/ajax", "$cname@apiDetail");

    Route::get("$baseUrl/list/{page}", "$cname@list");

}


function urlCreatorHelperFrontEnd($baseUrl, $controllerName){
    $cname = $controllerName;
    Route::get("$baseUrl/", "$cname@index");
    Route::get("$baseUrl/{page}", "$cname@index");
    Route::get("$baseUrl/detail/{id}", "$cname@detail");

}

?>