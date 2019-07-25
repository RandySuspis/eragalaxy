@extends('base::layout/frontendA')

@section('content')
    <div class="row side-content-top">
        <div class="col-md-6 side-content-left">
            <div style="margin-top: 100px; margin-left: 50px; margin-bottom: 20px; margin-right: 20px">
                <h2 class="text-white"><hr class="lineIndicatorBlue" /> REGISTER ACCOUNT</h2>
            </div>
        </div>

        <div class="col-md-6">
            <div id="registerStep3" style="margin-top:50px; margin-left: 50px; margin-right: 50px"></div>
        </div>
    </div>


    <script>
        var csrf_token = '{{ csrf_token()}}';
    </script>
@stop