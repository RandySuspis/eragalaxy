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
    $title = 'Template Title';
    ?>
@stop

@section('content')
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">Template Need To Change</h3>
        </div>

        <!-- /.box-header -->
        <div class="box-body">
            <a href="create"><button class="col-sm-offset-8 col-sm-4 btn" style="margin-bottom: 20px"> Create </button></a>
            <table id="example1" class="table table-bordered table-striped">
                <thead>
                <tr>
                    @foreach($show as $column)
                        <th>{{ $column['label'] }}</th>
                    @endforeach
                </tr>
                </thead>
                <tbody>

                @foreach ($data as $datum)
                    <tr>
                        @foreach($show as $column)
                            @if ($column['id'] == "action")
                                <td>
                                    <a href="/update">Edit</a>
                                    <a href="/delete">Delete</a>
                                </td>
                            @else
                                <td> - </td>
                            @endif
                        @endforeach
                    </tr>
                @endforeach

                </tbody>

                <tfoot></tfoot>
            </table>
        </div>
        <!-- /.box-body -->
    </div>

@stop

@section('bottom')
    {!! Theme::css('css/dataTables.bootstrap.min.css') !!}
    {!! Theme::js('js/jquery.dataTables.min.js') !!}
    {!! Theme::js('js/dataTables.bootstrap.min.js') !!}
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">
    <script>
        $.fn.dataTable.pipeline = function ( opts ) {
            // Configuration options
            var conf = $.extend( {
                pages: 2,     // number of pages to cache
                url: '',      // script url
                data: null,   // function or object with parameters to send to the server
                              // matching how `ajax.data` works in DataTables
                method: 'GET' // Ajax HTTP method
            }, opts );

            // Private variables for storing the cache
            var cacheLower = -1;
            var cacheUpper = null;
            var cacheLastRequest = null;
            var cacheLastJson = null;

            return function ( request, drawCallback, settings ) {
                var ajax          = false;
                var requestStart  = request.start;
                var drawStart     = request.start;
                var requestLength = request.length;
                var requestEnd    = requestStart + requestLength;

                if ( settings.clearCache ) {
                    // API requested that the cache be cleared
                    ajax = true;
                    settings.clearCache = false;
                }
                else if ( cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper ) {
                    // outside cached data - need to make a request
                    ajax = true;
                }
                else if ( JSON.stringify( request.order )   !== JSON.stringify( cacheLastRequest.order ) ||
                    JSON.stringify( request.columns ) !== JSON.stringify( cacheLastRequest.columns ) ||
                    JSON.stringify( request.search )  !== JSON.stringify( cacheLastRequest.search )
                ) {
                    // properties changed (ordering, columns, searching)
                    ajax = true;
                }

                // Store the request for checking next time around
                cacheLastRequest = $.extend( true, {}, request );

                if ( ajax ) {
                    // Need data from the server
                    if ( requestStart < cacheLower ) {
                        requestStart = requestStart - (requestLength*(conf.pages-1));

                        if ( requestStart < 0 ) {
                            requestStart = 0;
                        }
                    }

                    cacheLower = requestStart;
                    cacheUpper = requestStart + (requestLength * conf.pages);

                    request.start = requestStart;
                    request.length = requestLength*conf.pages;

                    // Provide the same `data` options as DataTables.
                    if ( $.isFunction ( conf.data ) ) {
                        // As a function it is executed with the data object as an arg
                        // for manipulation. If an object is returned, it is used as the
                        // data object to submit
                        var d = conf.data( request );
                        if ( d ) {
                            $.extend( request, d );
                        }
                    }
                    else if ( $.isPlainObject( conf.data ) ) {
                        // As an object, the data given extends the default
                        $.extend( request, conf.data );
                    }

                    settings.jqXHR = $.ajax( {
                        "type":     conf.method,
                        "url":      conf.url,
                        "data":     request,
                        "dataType": "json",
                        "cache":    false,
                        "success":  function ( json ) {
                            cacheLastJson = $.extend(true, {}, json);

                            // Randy Add View Item {
                            if (json.data.length > 0){
                                var firstcolumn = Object.keys(json.data[0])[0];
                                var secondcolumn = Object.keys(json.data[0])[1];

                                json.data.forEach(function(item) {
                                    item[secondcolumn] ="<a href=./view/"+item[firstcolumn]+">" + item[secondcolumn] + "</a>"
                                });
                            }


                            if ( cacheLower != drawStart ) {
                                json.data.splice( 0, drawStart-cacheLower );
                            }
                            json.data.splice( requestLength, json.data.length );

                            drawCallback( json );
                        }
                    } );
                }
                else {
                    json = $.extend( true, {}, cacheLastJson );
                    json.draw = request.draw; // Update the echo for each response
                    json.data.splice( 0, requestStart-cacheLower );
                    json.data.splice( requestLength, json.data.length );

                    drawCallback(json);
                }
            }
        };

        // Register an API method that will empty the pipelined data, forcing an Ajax
        // fetch on the next draw (i.e. `table.clearPipeline().draw()`)
        $.fn.dataTable.Api.register( 'clearPipeline()', function () {
            return this.iterator( 'table', function ( settings ) {
                settings.clearCache = true;
            } );
        } );

        $(document).ready(function () {
            $('#example1').DataTable({
                "lengthMenu": [[10, 25, 50, 100, 500], [10, 25, 50, 100, 500]],
                "processing":false,
                "serverSide":true,
                "stateSave":true,
                "columns":[
                        @foreach($show as $column)
                            {'data':'{{$column['id']}}'},
                            <?
                                if ($column['id'] == "action") {$isAction = true;}
                            ?>
                        @endforeach
                ],
                @if (isset($isAction))
                "columnDefs": [
                    {
                        "data": null,
                        "render": function(row,type,val,meta){
                            var result =
                                "<a href='update/"+val.id+"'>edit - </a> " +
                                "<a href='delete/"+val.id+"'>delete - </a>"
                            return result
                        },
                        "targets": -1
                    }
                ],
                @endif
                rowId: function(a) {
                    return 'id';
                },
                "searchDelay":1500,
                "ajax":
                    $.fn.dataTable.pipeline( {
                        "url": "{{$apiList}}",
                        "method": "GET",
                        'pages': 2
                    } )
            });
        })
    </script>
        {!! Theme::css("css/galaxyDashboard.css") !!}
        {!! Theme::css("css/galaxyList.css") !!}
@stop