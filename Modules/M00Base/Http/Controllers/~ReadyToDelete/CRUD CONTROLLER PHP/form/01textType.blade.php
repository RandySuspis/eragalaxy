<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <span class="col-sm-7">
            <input name="{{$colInput['name']}}"
                   style='border: #eee;border-style: solid;border-radius: 5px;padding: 2px; margin: 0px 0px; width: 100%; padding-inline-start: 15px;padding-inline-end: 15px;'
               @if (isset($colInput['placeholder']))
                   placeholder = "{{$colInput['placeholder']}}"
                @else
                   placeholder = "input {{$colInput['name']}} "
                @endif
                @if (isset($colInput['value']))
                   value = "{{$colInput['value']}}"
                @endif
                @if ( isset($data) && isset($data->{$colInput['name']}) )
                   value = "{{$data->{$colInput['name']} }}"
                @endif
                @if (isset($colInput['extra']))
                    @foreach($colInput['extra'] as $key => $value)
                        {{$key}} = "{{$value}}"
                    @endforeach
                @endif
                @if (isset($colInput['validation']))
                    <?php
                        $a = explode("|",$colInput['validation']);

                        foreach ($a as $validateItem){
                            if ($validateItem == "required"){
                                echo("required ");
                            }
                            if (!(strpos($validateItem, 'max:') === false)){
                                $b = trim($validateItem, 'max:');
                                echo("maxlength = $b ");
                            }
                            if (!(strpos($validateItem, 'min:') === false)){
                                $b = trim($validateItem, 'min:');
                                echo("minlength = $b ");
                            }
                            if ($validateItem == "email"){
                                echo("type='email' ");
                            }
                            if ($validateItem == "url"){
                                echo("type='url' ");
                            }
                        }
                    ?>
                @endif
            data-mask/>
        </span>
        <span class="col-sm-4">&nbsp;</span>
        <div class='col-sm-7 help-block with-errors'></div>

    </div>
</div>