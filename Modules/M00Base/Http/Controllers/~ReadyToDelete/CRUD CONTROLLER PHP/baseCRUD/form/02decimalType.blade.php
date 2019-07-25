<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <span class="col-sm-7">
            <input data-inputmask='"alias":"decimal", "groupSeparator": ",", "autoGroup":"true"' data-mask name="{{$colInput['name']}}"
                   style='border: #eee;border-style: solid;border-radius: 5px;padding: 2px; margin: 0px 0px; width: 100%;padding-inline-start: 15px;padding-inline-end: 15px'
               @if (isset($colInput['placeholder']))
                   placeholder = "{{$colInput['placeholder']}} "
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
                required="required"
            @endif

            />
        </span>
        <span class="col-sm-4">&nbsp;</span>
        <div class='col-sm-7 help-block with-errors'></div>
    </div>
</div>