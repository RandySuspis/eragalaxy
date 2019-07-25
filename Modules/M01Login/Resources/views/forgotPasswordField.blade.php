@extends('base::layout/frontendA')

@section('content')
    <header class="headerBG text-white">
        <div class="container text-center">
            <h2 style="font-weight: 700">FORGOT PASSWORD</h2>
        </div>
    </header>


    <div id="forgotPasswordFieldContainer"></div>

    <script>
        var csrf_token = '{{ csrf_token()}}';
    </script>
@stop