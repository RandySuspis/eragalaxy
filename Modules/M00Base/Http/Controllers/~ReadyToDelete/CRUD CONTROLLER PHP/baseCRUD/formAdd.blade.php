@extends('base::layout/backendA')

@section('setting')
    <?php
    $title = "Coba Add";
    $keyword = "";
    $metaTag = "";

    $show = ["join_date","exit_date","npwp","notes","office_id","phone1","registration_number"];
    $select = ["office_id"];
    $date = ["join_date","exit_date"];
    ?>
@stop


<!-- <script src="js/validator.min.js"></script> -->

@section('content')

    <?php
    $structure = [];
    for($j=0;$j<sizeof($typeColumns);$j++){
        if(in_array($typeColumns[$j]->Field, $show)){
            $dataTemp=[];
            $dataTemp["name"] = $typeColumns[$j]->Field;
            $dataTemp["id"] = $typeColumns[$j]->Field;

            if(in_array($typeColumns[$j]->Field, $select)){
                $dataTemp["type"]="select";
            } else {
                $dataTemp["type"]="text";
            }
            if(strcasecmp($typeColumns[$j]->Null, "NO")==0)
                $dataTemp["validation"]=["required"=>"required"];
            array_push($structure, $dataTemp);
        }
    }
    ?>

    @include('base::baseCRUD/form/00master',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure, 'targetForm'=>"create"])

@stop


@section('bottom')
    {!! Theme::js('js/validator.min.js') !!}
    {!! Theme::css("css/bootstrap-form-validation.css") !!}
    {!! Theme::css("css/select2.min.css") !!}
    {!! Theme::js('js/select2.full.min.js') !!}
    <script src="https://rawgit.com/RobinHerbots/Inputmask/4.x/dist/jquery.inputmask.bundle.js"></script>

    <script type="text/javascript">
        $(document).ready(function(){
            $(":input").inputmask();
        });
    </script>

@stop