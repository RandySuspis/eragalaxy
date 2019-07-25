<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">

    <!-- Sidebar user panel -->
    <div class="user-panel">
        <div class="pull-left image">
            <img src={{Theme::url("img/avatar5.png")}} class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
            <p>Alexander Pierce</p>
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
    </div>
    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
                    <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                    </button>
                  </span>
        </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu" data-widget="tree">
        @foreach($sideMenuObj as $obj)
            @if(isset($obj['headline']))
                <li class="header">{{$obj['title']}}</li>
            @else
                <li class="treeview">
                    <a href={{$obj['url']}}>
                        <i class="fa {{$obj['leftIcon']}}"></i>
                        <span>{{$obj['title']}}</span>
                        <span class="pull-right-container">
                                @if( isset($obj['rightIcon']) && $obj['rightIcon']!="")
                                <i class="fa {{$obj['rightIcon']}} pull-right"></i>
                            @elseif(isset($obj['submenus']))
                                <i class="fa fa-angle-left pull-right"></i>
                            @endif
                            </span>

                    </a>
                    @if(isset($obj["submenus"]))
                        <ul class="treeview-menu">
                            @foreach($obj["submenus"] as $submenu)
                                <li class="active">
                                    <a href={{$submenu["url"]}}>
                                        <i class="fa {{$submenu["leftIcon"]}}"> {{$submenu["title"]}} </i>
                                        <span class="pull-right-container">
                                                <i class="fa {{$obj['rightIcon']}} pull-right"></i>
                                            </span>
                                    </a>
                                </li>
                                {{--Randy: You can copy submenus if for the multilevel nesting, won't add it now as it will look clutter--}}
                            @endforeach
                        </ul>
                    @endif
                </li>
            @endif
        @endforeach
    </ul>
</section>
<!-- /.sidebar -->