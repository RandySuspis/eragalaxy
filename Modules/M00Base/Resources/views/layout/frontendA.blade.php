<!DOCTYPE html>
@yield('setting')
<html lang="en">
    <head>
        @include("base::layout.frontendA.header")
    </head>
    
    <body id="page-top">

<<<<<<< HEAD
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top d-none d-xs-none d-sm-none d-md-none d-lg-flex d-xl-flex" id="mainNav">
            <a class="navbar-brand js-scroll-trigger" href="/">Happy Puppy</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="/">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="/outlet/list">Outlet</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="/reservations/booking">Reservation</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="/promo">Promo</a>
                    </li>

                    @if (\Illuminate\Support\Facades\Auth::check())
                        <li class="nav-item nav-login-account">
                            <a class="nav-link js-scroll-trigger" href="/notifications">
                                <i class="fa fa-bell"></i>
                            </a>
                        </li>

                        <li class="nav-item nav-login-account dropdown" style=" padding-right:50px">
                            <a class="nav-link text-light" href="#" id="navbarDropdown">
                                {{\Illuminate\Support\Facades\Auth::user()->UserName}}
                            </a>
                            <ul id="dropdownItems" class="dropdown-menu" style="padding:0px">
                                <div class="row">
                                    <div class="col" style="padding-right:0px">
                                        <div style="border-bottom:1px solid #ccc; border-right:1px solid #ccc; text-align:center">
                                            <a href="/profile" style="padding:20px;width:100%;font-size:0.8em; font-weight:bold">
                                                <div><img src="{{URL::asset('images/member.png')}}" style="width:24px; height:24px; object-fit: contain"/></div>
                                                <br />
                                                MEMBER
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col" style="padding-left:0px">
                                        <div style="border-bottom:1px solid #ccc; text-align:center">
                                            <a href="/receipts" style="padding:20px;width:100%;font-size:0.8em; font-weight:bold">
                                                <div><img src="{{URL::asset('images/receipt.png')}}" style="width:24px; height:24px; object-fit: contain"/></div>
                                                <br />
                                                RECEIPT
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col" style="padding-right:0px">
                                        <div style="border-bottom:1px solid #ccc; border-right:1px solid #ccc; text-align:center">
                                            <a href="/reservations" style="padding:20px;width:100%;font-size:0.8em; font-weight:bold">
                                                <div><img src="{{URL::asset('images/reservation.png')}}" style="width:24px; height:24px; object-fit: contain"/></div>
                                                <br />
                                                MY RESERVATION
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col" style="padding-left:0px">
                                        <div style="border-bottom:1px solid #ccc; text-align:center">
                                            <a href="/vouchers" style="padding:20px;width:100%;font-size:0.8em; font-weight:bold">
                                                <div><img src="{{URL::asset('images/voucher.png')}}" style="width:24px; height:24px; object-fit: contain"/></div>
                                                <br />
                                                VOUCHER
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12">
                                        <div style="text-align:center; background:#e237c7; border-radius:0px 0px 4px 4px">
                                            <a href="/logout" style="padding:20px; color:#fff;width:100%;font-size:0.8em; font-weight:bold">
                                                Logout
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </ul>
                        </li>
                    @else
                        <li class="nav-item nav-login-account">
                            <a class="nav-link js-scroll-trigger" href="/login">Login</a>
                        </li>
                        <li class="nav-item nav-login-account" style="padding-right:50px">
                            <a class="nav-link js-scroll-trigger" href="/register" style="padding-right:50px">Register</a>
                        </li>
                    @endif
                </ul>
            </div>
        </nav>

        <div class="d-xs-block d-sm-block d-md-block d-lg-none d-xl-none nav-drawer navbar-dark">
            <!-- SideNav slide-out button -->
            <a href="#" data-activates="slide-out" class="btn p-3 button-collapse" style="color:#ffffff"><i class="fas fa-bars"></i></a>
            <span class="navbar-brand">Happy Puppy</span>

            @if (\Illuminate\Support\Facades\Auth::check())
                <a href="/notifications" class="side_btn p-3 button-collapse waves-effect"><i class="fa fa-bell"></i></a>
            @endif

            <!-- Sidebar navigation -->
            <div id="slide-out" class="side-nav fixed">
                <ul class="custom-scrollbar">

                    <!--Social-->
                    <li>
                        @if (\Illuminate\Support\Facades\Auth::check())
                            <?php
                                $navbar_image = \Illuminate\Support\Facades\Auth::user()->Photo;
                                if ($navbar_image == "") $navbar_image = "user.png";

                                $navbar_point = \Illuminate\Support\Facades\Auth::user()->Point;
                                if ($navbar_point == "") $navbar_point = "0";
                            ?>

                            <div class="profile-sidenav">
                                <div class="imgContainer" style="background-image: url('/user_uploads/{{$navbar_image}}'); background-size:cover; border: 5px SOLID #FFD700"></div>
                                <div class="profileData">
                                    <div style="font-weight:bold">{{\Illuminate\Support\Facades\Auth::user()->FirstName}} {{\Illuminate\Support\Facades\Auth::user()->LastName}}</div>
                                    <div>{{$navbar_point}} PTS</div>
                                </div>
                                <div class="clearfix"></div>

                                <ul style="margin-top:10px">
                                    <li><a href="/profile" class="waves-effect"><img src="{{URL::asset('images/member.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> MEMBER</a></li>
                                    <li><a href="/reservations" class="waves-effect"><img src="{{URL::asset('images/reservation.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> MY RESERVATION</a></li>
                                    <li><a href="/receipts" class="waves-effect"><img src="{{URL::asset('images/receipt.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> RECEIPTS</a></li>
                                    <li><a href="/vouchers" class="waves-effect"><img src="{{URL::asset('images/voucher.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> VOUCHER</a></li>
                                </ul>
                            </div>

                            <ul class="logout-sidenav">
                                <li><a href="/logout" class="waves-effect">LOGOUT</a></li>
                            </ul>
                        @else
                            <ul class="login-sidenav">
                                <li><a href="/login" class="waves-effect">Login</a></li>
                                <li><a href="/register" class="waves-effect">Register</a></li>
                            </ul>
                        @endif
                    </li>
                    <!--/Social-->

                    <!-- Side navigation links -->
                    <li>
                        <ul class="sidenav-menus">
                            <li><a href="/" class="waves-effect">Home</a></li>
                            <li><a href="/outlet/list" class="waves-effect">Outlet</a></li>
                            <li><a href="/reservations/booking" class="waves-effect">Reservation</a></li>
                            <li><a href="/promo" class="waves-effect">Promo</a></li>

                        </ul>
                    </li>
                    <!--/. Side navigation links -->

                </ul>
                <div class="sidenav-bg"></div>
            </div>
            <!--/. Sidebar navigation -->
        </div></div>


=======
        @if (\Illuminate\Support\Facades\Auth::check())
            <script>
                var navbar_name = '{{Auth::user()->UserName}}';
            </script>

            <div id="authNavbarContainer"></div>

        @else
            <div id="mainNavbarContainer"></div>
        @endif


        <div class="d-xs-block d-sm-block d-md-block d-lg-none d-xl-none nav-drawer navbar-dark" style="text-align:center">
            <span class="navbar-brand" style="padding:12px"><img src="{{URL::asset('images/logo.png')}}" style="height:30px" /></span>
            @if (\Illuminate\Support\Facades\Auth::check())
                <a href="/notifications" class="side_btn p-3 button-collapse waves-effect"><i class="fa fa-bell"></i></a>
            @endif

            <div id="touchSideSwipe" class="touch-side-swipe">
                <div id="slide-out" class="side-nav fixed">
                    <ul class="custom-scrollbar">

                        <!--Social-->
                        <li>
                            @if (\Illuminate\Support\Facades\Auth::check())
                                <?php
                                $navbar_image = \Illuminate\Support\Facades\Auth::user()->Photo;
                                if ($navbar_image == "") $navbar_image = "user.png";

                                $navbar_point = \Illuminate\Support\Facades\Auth::user()->Point;
                                if ($navbar_point == "") $navbar_point = "0";
                                ?>

                                <div class="profile-sidenav">
                                    <div class="imgContainer" style="background-image: url('/user_uploads/{{$navbar_image}}'); background-size:cover; border: 5px SOLID #FFD700"></div>
                                    <div class="profileData">
                                        <div style="font-weight:bold">{{\Illuminate\Support\Facades\Auth::user()->FirstName}} {{\Illuminate\Support\Facades\Auth::user()->LastName}}</div>
                                        <div>{{$navbar_point}} PTS</div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <ul style="margin-top:10px">
                                        <li><a href="/profile" class="waves-effect"><img src="{{URL::asset('images/member.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> MEMBER</a></li>
                                        <li><a href="/reservations" class="waves-effect"><img src="{{URL::asset('images/reservation.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> MY RESERVATION</a></li>
                                        <li><a href="/receipts" class="waves-effect"><img src="{{URL::asset('images/receipt.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> RECEIPTS</a></li>
                                        <li><a href="/vouchers" class="waves-effect"><img src="{{URL::asset('images/voucher.png')}}" style="width:20px; height:20px; object-fit: contain; margin-right:10px"/> VOUCHER</a></li>
                                    </ul>
                                </div>

                                <ul class="logout-sidenav">
                                    <li><a href="/logout" class="waves-effect">LOGOUT</a></li>
                                </ul>
                            @else
                                <ul class="login-sidenav">
                                    <li><a href="/login" class="waves-effect">Login</a></li>
                                    <li><a href="/register" class="waves-effect">Register</a></li>
                                </ul>
                            @endif
                        </li>
                        <!--/Social-->

                        <!-- Side navigation links -->
                        <li>
                            <ul class="sidenav-menus">
                                <li><a href="/" class="waves-effect">Home</a></li>
                                <li><a href="/outlet/list" class="waves-effect">Outlet</a></li>
                                <li><a href="/reservations/booking" class="waves-effect">Reservation</a></li>
                                <li><a href="/promo" class="waves-effect">Promo</a></li>

                            </ul>
                        </li>
                        <!--/. Side navigation links -->

                    </ul>
                    <div class="sidenav-bg"></div>
                </div>
                <!--/. Sidebar navigation -->
            </div>
        </div>



>>>>>>> origin/kristanto
        @include('toast::messages-jquery')
        @yield('content')
        @include("base::layout.frontendA.footer")
    </body>
</html>
