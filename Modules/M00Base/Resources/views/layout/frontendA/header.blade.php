<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Happy Puppy</title>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

<link href="{{URL::asset('BaseTheme/frontend/css/bootstrap.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('BaseTheme/frontend/css/mdb.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('BaseTheme/frontend/css/compiled-4.8.0.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('BaseTheme/frontend/css/style.min.css')}}" rel="stylesheet">
<link href="{{URL::asset('BaseTheme/frontend/style.css')}}" rel="stylesheet">
<link href="{{URL::asset('BaseTheme/frontend/navigationdrawer/touch-sideswipe.min.css')}}" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
<style type="text/css">
    @media (min-width: 800px) and (max-width: 850px) {
        .navbar:not(.top-nav-collapse) {
            background: #1C2331 !important;
        }
    }


</style>


<link rel="stylesheet" href="{{URL::asset('dist/vendors.css')}}">
<link rel="stylesheet" href="{{URL::asset('dist/frontend.css')}}">


{{--<link rel="stylesheet" href="http://localhost:8080/vendors.css">--}}
{{--<link rel="stylesheet" href="http://localhost:8080/frontend.css">--}}


{{--Setup the JS DATA--}}
<?php
if(isset($JS)){
    foreach ($JS as $key => $value) {
        if (isset($value)){
            if ($key != "mainId"){
                echo "<script type='text/javascript'> var $key=$value; </script>";
            }
        }
    }
}
?>