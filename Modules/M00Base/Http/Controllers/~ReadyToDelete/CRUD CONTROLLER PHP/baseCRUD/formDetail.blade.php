@extends('layout/backendA')

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
    $title = 'Agent';
    ?>
@stop

@section('content')

    <div class="box">
        <div class="box-header">
            <h3 class="box-title">Template Need To Change</h3>
        </div>

        <!-- /.box-header -->
        <div class="box-body">
            @foreach($show as $column)
                @if ($column == "action")
                @else
                <dl class="col-sm-4">
                        <dt> {{$column}} </dt>
                        <dd>
                            {{ $data->{$column} }}
                        </dd>

                </dl>
                @endif
            @endforeach
            <div class="col-sm-12">
                <a href="../edit/{{ $data->{'id'} }}">Edit</a>
                <a href="../delete/{{ $data->{'id'} }}">Delete</a>
            </div>
        </div>
        <!-- /.box-body -->
    </div>

@stop

@section('bottom')
    {!! Theme::css('css/dataTables.bootstrap.min.css') !!}

    {!! Theme::js('js/jquery.dataTables.min.js') !!}
    {!! Theme::js('js/dataTables.bootstrap.min.js') !!}

@stop