<!--Footer-->
<footer class="page-footer text-center font-small">
  <!-- Social icons -->
  <div class="pb-4" style="padding-top:20px">
    <div class="container">
      <hr style="border-top:1px solid #777"/>
      <div>
        <h2 align="left">Happy Puppy</h2>
        <div style="font-size:0.8em; text-align:left; padding-bottom:10px">© 2019 Copyright Snowbird. All Rights Reserved</div>
      </div>

      <div style="text-align:center;margin-top:-50px">
        <div>
          <a href="https://www.facebook.com/mdbootstrap" target="_blank">
            <i class="fab fa-facebook-f mr-3"></i>
          </a>

          <a href="https://twitter.com/MDBootstrap" target="_blank">
            <i class="fab fa-twitter mr-3"></i>
          </a>

          <a href="https://www.youtube.com/watch?v=7MUISDJ5ZZ4" target="_blank">
            <i class="fab fa-youtube mr-3"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!--Copyright-->
  <div class="footer-copyright py-3">
  </div>
  <!--/.Copyright-->

</footer>
<!--/.Footer-->

<!-- SCRIPTS -->
<!-- JQuery -->
<script src="{{URL::asset('BaseTheme/frontend/js/jquery-3.4.0.min.js')}}"></script>
<script src="{{URL::asset('BaseTheme/frontend/js/popper.min.js')}}"></script>
<script src="{{URL::asset('BaseTheme/frontend/js/bootstrap.min.js')}}"></script>
<script src="{{URL::asset('BaseTheme/frontend/js/mdb.min.js')}}"></script>
<script src="{{URL::asset('BaseTheme/frontend/navigationdrawer/touch-sideswipe.min.js')}}"></script>
<script type="text/javascript">
    new WOW().init();

    // SideNav Button Initialization
    $(".button-collapse").sideNav();
    // SideNav Scrollbar Initialization
    var sideNavScrollbar = document.querySelector('.custom-scrollbar');
    var ps = new PerfectScrollbar(sideNavScrollbar);


    $("#navbarDropdown").on('click', function() {
        if(!$("#dropdownItems").hasClass("show")) {
            $("#dropdownItems").addClass("show");
        } else {
            $("#dropdownItems").removeClass("show");
        }
    });
</script>

<script type="text/javascript">
    var config = {
        elementID: 'touchSideSwipe',
        elementWidth: 400, //px
        elementMaxWidth: 0.8, // *100%
        sideHookWidth: 44, //px
        moveSpeed: 0.2, //sec
        opacityBackground: 0.8,
        shiftForStart: 50, // px
        windowMaxWidth: 1024, // px
    }
    var touchSideSwipe = new TouchSideSwipe(config);
</script>
<script>
    // demo open/close buttons
    document.getElementById('callOpen').addEventListener('click', function(){touchSideSwipe.tssOpen()});
    document.getElementById('callClose').addEventListener('click', function(){touchSideSwipe.tssClose()});
</script>

<!--
<script src="{{URL::asset('dist/vendors.js')}}"></script>
<script src="{{URL::asset('dist/frontend.js')}}"></script>
-->

<script src="{{URL::asset('dev/vendors.js')}}"></script>
<script src="{{URL::asset('dev/frontend.js')}}"></script>

{{--<script src="http://localhost:8080/vendors.js"></script>--}}
{{--<script src="http://localhost:8080/frontend.js"></script>--}}
