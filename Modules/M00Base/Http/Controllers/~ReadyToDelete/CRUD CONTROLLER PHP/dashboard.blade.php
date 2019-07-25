@extends('base::layout/backendA')

<?php
$mainMenuObj = [
    'Agent' => ['topTitle' => '120', 'midTitle' => 'Agent', 'bottomTitle' => 'more info', 'color' => 'bg-aqua', 'icon' => 'ion ion-person', 'url' => '/Agent/'],
    'Komisi' => ['topTitle' => '150', 'midTitle' => 'Transaction', 'bottomTitle' => 'more info', 'color' => 'bg-green', 'icon' => 'ion ion-stats-bars', 'url' => '/Komisi/'],
    'Report' => ['topTitle' => 'Report', 'midTitle' => 'Top Agent', 'bottomTitle' => 'more info', 'color' => 'bg-red', 'icon' => 'ion ion-book', 'url' => '/Report/'],
    'Lain-lain' => ['topTitle' => 'Lain-lain', 'midTitle' => 'Role & User', 'bottomTitle' => 'more info', 'color' => 'bg-orange', 'icon' => 'fa fa-table', 'url' => '/Other/'],
];
?>

@section('content')

    @foreach($mainMenuObj as $menu)
        <div class="col-lg-3 col-xs-6">
            <!-- small box -->
            <div class="small-box {{$menu['color']}}">
                <div class="inner">
                    <h3>{{$menu['topTitle']}}</h3>

                    <p>{{$menu['midTitle']}}</p>
                </div>
                <div class="icon">
                    <i class="{{$menu['icon']}}"></i>
                </div>
                <a href="{{$menu['url']}}" class="small-box-footer">{{$menu['bottomTitle']}} <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
    @endforeach

@stop