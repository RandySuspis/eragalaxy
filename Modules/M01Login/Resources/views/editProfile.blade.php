@extends('base::layout/frontendA')

@section('content')
    <header class="headerBG text-white">
        <div class="container text-center">
            <h2 style="font-weight: 700">EDIT PROFILE</h2>
        </div>
    </header>

    <div id="editProfileContainer"></div>

    <script>
        var csrf_token = '{{ csrf_token()}}';
    </script>
@stop