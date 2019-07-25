<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <span class="col-sm-7">
            @if (isset($colInput['option']))
                @foreach($colInput['option'] as $key => $value)
                <input type="radio" name="{{$colInput['name']}}" id="{{$colInput['name']}}{{$value}}" value={{$key}} />
                <label for="{{$colInput['name']}}{{$value}}">{{$value}}</label>
                @endforeach
            @endif
        </span>

        <div class='help-block with-errors'></div>
    </div>
</div>