<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <span class="col-sm-7">
            <textarea name="{{$colInput['name']}}" class="form-control col-sm-8" rows="3" placeholder="{{$colInput['placeholder']}}"
            style=""
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
            >@if ( isset($data) && isset($data->{$colInput['name']}) ) {{ $data->{$colInput['name']} }} @endif</textarea>
        </span>
        <div class='help-block with-errors'></div>
    </div>
</div>