<div class=col-md-6>
    <div class='input-group form-group' style="width:100%">
        <label class="col-sm-4" style='text-align: right;'>{{$colInput['label']}}</label>
        <span class="col-sm-7">
        <select class='form-control select2 select2-hidden-accessible col-sm-7'
                style='width: 100%;'
                name="{{$colInput['name']}}"
                id="{{$colInput['name']}}"
                @if ( isset($data) && isset($data->{$colInput['name']}) )
                    value = "{{$data->{$colInput['name']} }}"
                @endif
        ></select>
        </span>
        <div class='help-block with-errors'></div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function(){
        $('#{{$colInput['name']}}').select2({
            placeholder:'{{$colInput['placeholder']}}',
            ajax: {
                url: '{{$colInput['optionAjax']}}',
                dataType: 'json',
                processResults: function (data) {
                    return {
                        results:  $.map(data, function (item) {
                            return {
                                text: item.name,
                                id: item.id
                            }
                        })
                    };
                },
                cache: true
            }
        });

        setTimeout(function(){
            @if ( isset($data) && isset($data->{$colInput['name']}) )
            <?php
                $valueData = $data->{$colInput['name']}
                ?>
            if ($('#{{$colInput['name']}}').find("option[value='" + {{$valueData}} + "']").length) {
                $('#{{$colInput['name']}}').val('{{$valueData}}').trigger('change');
            } else {
                // Create a DOM Option and pre-select by default
                var newOption = new Option({{$valueData}}, {{$valueData}}, true, true);
                // Append it to the select
                $('#{{$colInput['name']}}').append(newOption).trigger('change');
            }
            @endif
        }, 300);

    });
</script>