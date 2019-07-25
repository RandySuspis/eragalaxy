@extends('base::layout/backendA')

<?php
$mainMenuObj = [
    'Agent' => ['topTitle' => '120', 'midTitle' => 'Agent', 'bottomTitle' => 'more info', 'color' => 'bg-aqua', 'icon' => 'ion ion-person', 'url' => '/Agent/'],
    'Komisi' => ['topTitle' => '150', 'midTitle' => 'Transaction', 'bottomTitle' => 'more info', 'color' => 'bg-green', 'icon' => 'ion ion-stats-bars', 'url' => '/Komisi/'],
    'Report' => ['topTitle' => 'Report', 'midTitle' => 'Top Agent', 'bottomTitle' => 'more info', 'color' => 'bg-red', 'icon' => 'ion ion-book', 'url' => '/Report/'],
    'Lain-lain' => ['topTitle' => 'Lain-lain', 'midTitle' => 'Role & User', 'bottomTitle' => 'more info', 'color' => 'bg-orange', 'icon' => 'fa fa-table', 'url' => '/Other/'],
];
?>

@section('setting')
    <?php
    $title = $moduleBaseUrl." Update";
    $titlePage = ucfirst($moduleBaseUrl);
    $subtitlePage = "Update"
    ?>
@stop

@section('content')
    <div class="box" id="{{ $JS['mainId'] }}">
        <!-- /.box-body -->
    </div>

@stop

@section('bottom')
    {{--<script src="/dist/vendors.js"></script>--}}
    {{--<script src="/dist/backend.js"></script>--}}
    {{--<link rel="stylesheet" href="/dist/backend.css">--}}
    <link rel="stylesheet" href="http://localhost:8080/vendors.css">
    <link rel="stylesheet" href="http://localhost:8080/backend.css">
    <script src="http://localhost:8080/vendors.js"></script>
    <script src="http://localhost:8080/backend.js"></script>
@stop