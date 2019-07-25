<div class=box box-default>
    
    <form data-toggle=validator method=post action='{{$targetForm}}' role=form novalidate=true>
        {{ csrf_field() }}
        <div class=box-body>
            @if (isset($structure))
            <?php $i = 0 ?>
            @foreach($structure as $key=>$colInput)
                <?php
                    if($i%2 == 0 && $i != 0){
                        echo ('</div>');
                    }

                    if($i%2 == 0){
                        echo ('<div class="row test">');
                    }
                    $i = $i+1;
                ?>
                    @switch($colInput['type'])
                        @case("text")
                            @include('baseCRUD/form/01textType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("decimal")
                            @include('baseCRUD/form/02decimalType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("radio")
                            @include('baseCRUD/form/03radioType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("select")
                            @include('baseCRUD/form/04selectType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("date")
                            @include('baseCRUD/form/05dateType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("datetime")
                            @include('baseCRUD/form/06datetimeType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @case("textarea")
                            @include('baseCRUD/form/07textAreaType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                        @break

                        @default
                            @include('baseCRUD/form/01textType',['data'=>(isset($data)?$data:null), 'structure'=>$inputStructure])
                    @endswitch
            @endforeach
            @endif
        </div>
        <div class=box-footer>
            <input type=submit value=Submit class='btn float-right login_btn btn-primary'/>
        </div>
    </form>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

</div>