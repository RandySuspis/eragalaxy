<head>
    @include('base::layout.base.meta')
    <title>{{$title}}</title>

    @include('base::layout.base.fonts')

    <!-- Bootstrap 3.3.7 -->
    {!! Theme::css("css/bootstrap.min.css") !!}
    <!-- Font Awesome -->
    {!! Theme::css("css/font-awesome.min.css") !!}
    <!-- Ionicons -->
    {!! Theme::css("css/ionicons.min.css") !!}
    <!-- AdminLTE-->
    {!! Theme::css("css/AdminLTE.min.css") !!}
    <!-- Theme style -->
    {!! Theme::css("css/_all-skins.min.css") !!}

    <!-- Date Picker -->
    {!! Theme::css("css/bootstrap-datepicker.min.css") !!}
    <!-- Daterange picker -->
    {!! Theme::css("css/daterangepicker.css") !!}
    <!-- bootstrap wysihtml5 - text editor -->

    <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    {!! Theme::js("js/jquery.min.js") !!}
    {!! Theme::js("js/jquery-ui.min.js") !!}
    {!! Theme::js("js/bootstrap.min.js") !!}

<!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

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

</head>