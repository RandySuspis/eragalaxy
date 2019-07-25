<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <input class="col-sm-7" type="text" name="{{$colInput['name']}}"
            @if ( isset($data) && isset($data->{$colInput['name']}) )
               value = "{{$data->{$colInput['name']} }}"
            @endif
            @if (isset($colInput['placeholder']))
               placeholder = "{{$colInput['placeholder']}}"
            @else
               placeholder = "input {{$colInput['name']}} "
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
        />
        <div class='help-block with-errors'></div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $("#{{$colInput['name']}}").datepicker({
            autoclose: true,
            format: "dd/mm/yyyy"
        });
    });
</script>