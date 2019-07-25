<?php


function createJSBladeParam($parameter = ['show_id','project_name','agent_name'], $phpData, $javascript = null){
    $result = [];

    if (isset($javascript) && $javascript == true){
        foreach ($parameter as $param){
            $result[$param] = '${item.'.$param.'}';
        }
    }else{
        foreach ($parameter as $param){
            $result[$param] = $phpData->{$param};
        }
    };
    return $result;
};



function checkModuleExist($moduleName){
    $ffs = scandir('../Modules');
    foreach ($ffs as $ff){
        if ($moduleName == $ff){
            return true;
        }
    }
    return false;
}
?>