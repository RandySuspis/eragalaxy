<!DOCTYPE html>
<?php
    // This is Default Setting can be overwritten in yield settings
    $title = "Alvonse Template";
//    dd(Sentinel::check());
?>
@yield('setting')

<html lang="en">

    @include('base::layout.base.head')

    <div id="login">
    </div>
</html>
<script>
    var csrf_token = '{{ csrf_token()}}';
</script>


{!! Theme::js('js/validator.min.js') !!}

{{--<script src="/dist/vendors.bundle.js"></script>--}}
{{--<script src="/dist/backend.bundle.js"></script>--}}
<link rel="stylesheet" href="http://localhost:8080/backend.css">
<link rel="stylesheet" href="http://localhost:8080/vendors.css">
{{--<script src="{{URL::asset('dev/vendors.js')}}"></script>--}}
{{--<script src="{{URL::asset('dev/frontend.js')}}"></script>--}}

<script src="http://localhost:8080/vendors.js"></script>
<script src="http://localhost:8080/frontend.js"></script>
