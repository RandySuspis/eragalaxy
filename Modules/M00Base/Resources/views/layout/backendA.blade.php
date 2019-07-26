<!DOCTYPE html>
<?php
// This is Default Setting can be overwritten in yield settings (Hmm Apparently the index.blade run first, then this one run)
$title = isset($title) ? $title : "Alvonse Template";

//Create the Object using this https://jsoneditoronline.org/ or this one https://jsonformatter.org/json-editor
//Make sure there's no bad string

//Label Object Type = {title, headline}
//Parent Object Type = {title, leftIcon, rightIcon, url, submenus}
//Submenu Object Type = {title, leftIcon, rightIcon, url}

//$sideMenu = '
//{"Main Headline":{"title":"Main Headline","headline":2},"Agent":{"title":"Agent","leftIcon":"fa-dashboard","rightIcon":"fa-angle-left","url":"#","submenus":[{"title":"View","leftIcon":"fa-circle-o","rightIcon":"fa-angle-left","url":"king"},{"title":"Add","leftIcon":"fa-circle-o","rightIcon":"fa-angle-left","url":"king"}]},"Komisi":{"title":"Komisi","leftIcon":"fa-edit","rightIcon":"","url":"#","submenus":[{"title":"View Komisi","leftIcon":"fa-table","rightIcon":"fa-angle-left","url":"king"},{"title":"Add Komisi","leftIcon":"fa-circle-o","rightIcon":"fa-angle-left","url":"king"}]},"Report":{"title":"Report","leftIcon":"fa-book","rightIcon":"","url":"#"},"Lain-lain":{"title":"Lain-Lain","leftIcon":"fa-table","rightIcon":"","url":"#"},"Logout":{"title":"Logout","leftIcon":"fa-share","rightIcon":"","url":"#"}}
//';
//
//$sideMenuObj = json_decode($sideMenu, true);
//$sideMenuObj['Agent']['active'] = 1;

$sideMenuObj = [
    'Main Headline' =>
        ['title' => 'Main Headline', 'headline' => 2],
    'Agent' =>
        ['title' => 'Agent', 'leftIcon' => 'fa-dashboard', 'rightIcon' => 'fa-angle-left', 'url' => '#', 'submenus' =>
            [
                0 => ['title' => 'View','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/agent/list'],
                1 => ['title' => 'Add','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/agent/create'],
                2 => ['title' => 'Report','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/agent/report'],
            ]
        ],
    'Property' =>
        ['title' => 'Property', 'leftIcon' => 'fa-edit', 'rightIcon' => 'fa-angle-left', 'url' => '#', 'submenus' =>
            [
                0 => ['title' => 'View','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/primary/list'],
                1 => ['title' => 'Add','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/primary/create'],
                2 => ['title' => 'Report','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/primary/report'],
            ]
        ],
    'Komisi' =>
        ['title' => 'Komisi Transaction', 'leftIcon' => 'fa-edit', 'rightIcon' => 'fa-angle-left', 'url' => '#', 'submenus' =>
            [
                0 => ['title' => 'View','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/transaction/list'],
                1 => ['title' => 'Add Primary','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/transaction_primary/create'],
                2 => ['title' => 'Add','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/transaction/create'],
            ]
        ],
    'Master' =>
        ['title' => 'Master Table', 'leftIcon' => 'fa-edit', 'rightIcon' => 'fa-angle-left', 'url' => '#', 'submenus' =>
            [
                0 => ['title' => 'Office','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/branch/list'],
                1 => ['title' => 'Office Report','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/branch/report'],
                2 => ['title' => 'LevelAgent','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/levelAgent/list'],
                3 => ['title' => 'UserAdmin','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/user/list'],
                4 => ['title' => 'UserRole','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/role/list'],
                5 => ['title' => 'DefaultSetting','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/default/list'],
                6 => ['title' => 'Tax','leftIcon' => 'fa-circle-o','rightIcon' => 'fa-angle-left','url' => '/tax/list'],
            ]
        ],
    'Logout' => ['title' => 'Logout', 'leftIcon' => 'fa-share', 'rightIcon' => 'fa-angle-left', 'url' => '#'],
];

$titlePage = isset($titlePage)?$titlePage:"Form Title";
$subtitlePage = isset($subtitlePage)?$subtitlePage:"subtitle";
?>

@yield('setting')

<html>

@include('base::layout.base.head')

<body class="hold-transition skin-white sidebar-mini">

<div class="wrapper">
    <header class="main-header">
        <!-- Logo -->
        <a href="index2.html" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini" style="color:red"><b>G</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg" style="color:red"><b>GALAXY</b></span>
        </a>

        @include('base::layout/backendA/00header')
    </header>

    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        @include('base::layout/backendA/10sideBar')
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                {{$titlePage}}
                <small>{{$subtitlePage}}</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content">
            @yield('content')
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <footer class="main-footer">
        @include('base::layout/backendA/20footer')
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        @include('base::layout/backendA/30aside')
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</div>


<!-- ./wrapper -->

<!-- jQuery 3 -->
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>

<!-- daterangepicker -->
{!! Theme::js('js/moment.min.js') !!}

{!! Theme::js('js/daterangepicker.js') !!}
<!-- datepicker -->
{!! Theme::js('js/bootstrap-datepicker.min.js') !!}

<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
{!! Theme::js("js/jquery.slimscroll.min.js") !!}
<!-- FastClick -->
{!! Theme::js("js/fastclick.js") !!}

<!-- AdminLTE App -->
{!! Theme::js("js/adminlte.min.js") !!}
{!! Theme::js("js/dashboard.js") !!}
{!! Theme::js("js/demo.js") !!}

@yield('bottom')

</body>
</html>
