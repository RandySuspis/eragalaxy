@extends('base::layout/backendA')

@section('setting')
    <?php
    $title = "Coba Add";
    $keyword = "";
    $metaTag = "";
    $type = ["text"];
    $validation = ["required" => "required","maxLength"=>"6","minLength"=>"5"];
    $show = ["join_date","exit_date","npwp","notes","office_id","phone1","registration_number", "name"];
    $select = ["office_id"];
    $date = ["join_date","exit_date"];

    $titlePage = "Halo";
    ?>
@stop

@section('content')

    <div class="box-header">
        <h3 class="box-title">Update Form</h3>
    </div>
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

    @include('base::baseCRUD/form/00master',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure, 'targetForm'=>""])

@stop

@section('bottom')
    {!! Theme::js('js/validator.min.js') !!}
    {!! Theme::css("css/bootstrap-form-validation.css") !!}
    {!! Theme::css("css/select2.min.css") !!}
    {!! Theme::js('js/select2.full.min.js') !!}
    <script src="https://rawgit.com/RobinHerbots/Inputmask/4.x/dist/jquery.inputmask.bundle.js"></script>
@stop