import  React from 'react'
import { Field} from 'formik';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import emailMask from 'text-mask-addons/dist/emailMask'
import Select from 'react-select'
import AsyncSelect from "react-select/lib/Async";
import DatePicker from 'react-datepicker'
// https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
import "react-datepicker/dist/react-datepicker.css";
import "./FieldType.scss";
import request from "../../Shared/RequestWrapper.jsx";
import propTypes from "prop-types"


// First, you need to create the `numberMask` with your desired configurations

const testOptions = [
    { value: 'Choco', label: 'Chocolate' },
    { value: 'Strawberry', label: 'Strawberry' },
    { value: 'Vanilla', label: 'Vanilla' }
]

class FieldText extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        disabled: propTypes.bool,
    }
    render() {
        return (<Field type="text" className="form-control" {...this.props} />);
    }
}

class FieldPassword extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
    }
    render() {
        return (<Field type="password" {...this.props} className="form-control" />);
    }
}

class FieldEmail extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
    }
    render() {
        var {placeholder, name}= this.props;
        return (<Field type="email" name={name} render={({ field }) => {
                return (<MaskedInput mask={emailMask} className="col-sm-3"
                                     {...field}
                                     placeholder={placeholder}
                                     className="form-control" /> )} } />
        );
    }
}

class FieldNumber extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        disabled:propTypes.bool,
        prefix: propTypes.string,
        suffix: propTypes.string,
        separator: propTypes.string,
    }

    static defaultProps = {
        suffix: "",
        prefix: "",
        separator: ".",
    }


    render() {
        var mask = createNumberMask({
            prefix: this.props.prefix,
            suffix: this.props.suffix,
            thousandsSeparatorSymbol: this.props.separator
        });

        var {placeholder, name}= this.props;
        return (<Field type="text" name={name} render={({ field }) => {
                return (<MaskedInput type="text" mask={mask}
                               {...field}
                               placeholder={placeholder}
                               disabled={this.props.disabled}
                               className="form-control field-number"
                               {...this.props}
                    />);
            }} />
        )
    }
}

class FieldPercent extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        disabled:propTypes.bool,
        prefix: propTypes.string,
        suffix: propTypes.string,
        separator: propTypes.string,
    }

    static defaultProps = {
        suffix: " %",
        prefix: "",
        separator: "",
    }

    checkPercent = (value) => {
        let decimalBefore = 2;
        let decimalAfter = 2;
        let decimalChar = ".";

        if (value.length==0){
            return [/\d/,"%"];
        }
        value = value.replace(/%/g,'');
        var mask = [];
        var weFoundDecimalChar = false;


        for (let i = 0; i < value.length; i++) {
            if (value[i] == decimalChar) {
                if (!weFoundDecimalChar){
                    mask.push(decimalChar);
                weFoundDecimalChar = true;
                }
            }else{
                if (weFoundDecimalChar){
                    if (decimalAfter > 0){
                        mask.push(/\d/);
                        decimalAfter--;
                    }
                }else{
                    if (decimalBefore > 0){
                        mask.push(/\d/);
                        decimalBefore--;
                    }else if (decimalBefore == 0){
                        mask.push(decimalChar);
                        mask.push(/\d/);
                        weFoundDecimalChar = true;
                        decimalAfter--;
                    }
                }
            }
        }
        mask.push("%");
        return mask;
    }

    render() {
        var {placeholder, name}= this.props;
        return (<Field type="text" name={name} render={({ field }) => {
                return (
                    <React.Fragment>
                    <MaskedInput type="text"
                                     mask={this.checkPercent}
                                     showMask={true}
                                     guide={false}
                                     placeholderChar={"0"}
                                     className="form-control percent-show"
                                     {...field}
                                     {...this.props}/>

                    </React.Fragment>
                );
            }} />
        )
    }
}

class FieldDateWithSelect extends React.Component{
    constructor() {
        super();
        var days = []
        for (let i = 1; i <= 31; i++) {
            days.push({value:i, label:(i<10? "0"+i: ""+i)})
        }
        var months = [""]
        for (let i = 1; i <= 12; i++) {
            months.push({value:i, label:(i<10? "0"+i: ""+i)})
        }
        var years = [""]
        for (let i = 2019; i > 1960; i--) {
            years.push({value:i, label:i+""})
        }
        this.state = {
            days:days,
            months:months,
            years:years
        }
    }

    populateData = (values,form) => {
        var {name} = this.props;
        var day = null;
        var month=null;
        var year = null;
        if (values[name+"-"] && values[name+"-"].day){
            day = values[name+"-"].day;
        }
        if (values[name+"-"] && values[name+"-"].month){
            month = values[name+"-"].month;
        }
        if (values[name+"-"] && values[name+"-"].year){
            year = values[name+"-"].year;
        }
        var d = new Date(parseInt(year), parseInt(month), parseInt(day), 0, 0, 0, 0);
        form.setFieldValue(name,day+"/"+month+"/"+year);

    }

    createSelect = (name, placeholder, options, value)=>{
        return (
            <Field type="text" name={name} render={({ value, field, form }) => {
                return (<Select
                    options={options}
                    name={name}
                    placeholder={placeholder}
                    initialValue={{ label: value, value: value }}
                    defaultValue={{ label: "01", value: 1 }}
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null

                    }}
                    value={options ? options.find(option => option.value === field.value) : ''}
                    isClearable={true}
                    onChange={(option) => {
                        this.onSelectDateSet(option, field, form)
                    }}
                    onBlur={() => {
                        form.setFieldTouched(field.name);
                    }}
                    defaultValue={"01"}
                /> )} } />
        )
    }

    onSelectDateSet = (option, field, form) => {
        var name = field.name;
        var value = option==null?null:option.value;
        if (option==null){
            form.setFieldValue(field.name, value)
        }else{
            form.setFieldValue(field.name, value)
        }

        var baseName = this.props.name;
        if (form.values[baseName+"-"]){
            var day = (name == baseName+"-[day]") ? value : form.values[baseName+"-"].day;
            var month = (name == baseName+"-[month]") ? value : form.values[baseName+"-"].month;
            var year = (name == baseName+"-[year]") ? value : form.values[baseName+"-"].year;
            if (day && month && year){
                form.setFieldValue(baseName, day+"/"+month+"/"+year);
            }
        }

    }

    onDatePick = (date, event, field, form) => {
        var name = field.name;
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        form.setFieldValue(name, day+"-"+month+"-"+year);
        form.setFieldValue(name+"-[day]", day);
        form.setFieldValue(name+"-[month]", month);
        form.setFieldValue(name+"-[year]", year);
        // this.props.form[name+"-[day]"]= day;
        // this.props.form[name+"-[month]"]= month;
        // this.props.form[name+"-[year]"]= year;
        // console.log("onDatePick");
    }

    render() {
        var {placeholder, name}= this.props;
        return(
            <React.Fragment>
                <span className={"col-xs-3 row dateSelect"}>
                    {this.createSelect(name+"-[day]", "days", this.state.days, this.state.day)}
                </span>
                <span className={"col-xs-3 row dateSelect"}>
                    {this.createSelect(name+"-[month]", "months", this.state.months, this.state.month)}
                </span>
                <span className={"col-xs-4 row dateSelect"}>
                    {this.createSelect(name+"-[year]", "years", this.state.years, this.state.year)}
                </span>
                <span className={"col-xs-2 dateSelect"}>
                    <Field type="text" name={name} render={({ value, field, form }) => {
                        return (
                            <DatePicker style={{zIndex:"10"}}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText="dd-MM-yyyy"
                                        className="form-control"
                                // customInput={<button type="button">datepicker</button>}
                                        onChange={(date, event)=>{
                                            this.onDatePick(date, event, field, form)
                                        }}

                            />
                        )
                    }} />

                </span>
            </React.Fragment>);
    }
}

class FieldDateWithDatePicker extends React.Component{
    constructor() {
        super();
    }

    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        dateFormat: propTypes.string
    }

    static defaultProps = {
        dateFormat: "yyyy-MM-dd",
        placeholder: "yyyy-mm-dd"
    }


    onDatePick = (date, event, field, form) => {
        var name = field.name;
        var day = date.getDate();
        if (day < 10){
            day = "0"+day;
        }
        var month = date.getMonth()+1;
        if (month < 10){
            month = "0"+month;
        }
        var year = date.getFullYear();
        form.setFieldValue(name, day+"-"+month+"-"+year);

        // form.setFieldValue(name+"-[day]", day, false);
        // form.setFieldValue(name+"-[month]", month, false);
        // form.setFieldValue(name+"-[year]", year, false);
        // this.props.form[name+"-[day]"]= day;
        // this.props.form[name+"-[month]"]= month;
        // this.props.form[name+"-[year]"]= year;
        // console.log("onDatePick");
    }

    render() {
        var {placeholder, name}= this.props;
        return(
            <span className={"col-xs-12 row dateSelect"}>

                    <Field type="text" name={name} render={({ value, field, form }) => {
                        var date = null;
                        return (
                            <DatePicker {...field}
                                        style={{zIndex:"10"}}
                                        selected={date}
                                        dateFormat={this.props.dateFormat}
                                        placeholderText={this.props.placeholder}
                                        className="form-control"
                                        value={field.value}
                                        name={name}
                                        autoComplete="off"
                                        // customInput={<button type="button">datepicker</button>}
                                        onChange={(date, event)=>{
                                            this.onDatePick(date, event, field, form)
                                        }}

                            />
                        )
                    }} />
            </span>);
    }
}

class FieldSelect extends React.Component{

    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        options: propTypes.array.isRequired,
    }

    loadOptions= (inputValue, callback) => {

        request({
            url:    this.props.ajaxUrl,
            method: 'GET',
            params:   {'searchText': inputValue}
        }).then(response => {
            var result = response.data;
            var optionsResult = result.map(item => {
                return {label:item.label, value:item.value}
            })
            callback(optionsResult);
        })

    }

    render() {
        var {placeholder, name, options}= this.props;


        return(
            <span className="fieldSelect">
                <Field type="text" name={name} render={({ field, form }) => {
                    var initialValue = field.value;
                    if (field && field.value){
                    }

                    return (<AsyncSelect
                        options={customStyles}
                        classNamePrefix={"randy"}
                        cacheOptions defaultOptions loadOptions={this.loadOptions}
                        options={options}
                        name={field.name}
                        placeholder={placeholder}
                        value={options ? options.find(option => option.value === field.value) : ''}
                        // value={options ? options.find(option => option.value === field.value) : ''}
                        onChange={(option) => {
                            if (option==null){
                                form.setFieldValue(field.name, option)
                            }else{
                                form.setFieldValue(field.name, option.value)
                            }
                        }}
                        onBlur={() => {
                            form.setFieldTouched(field.name);
                        }}
                        isClearable={true}
                    /> )} } />
            </span>);
    }
}

class FieldAsyncSelect extends React.Component{

    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        initialValue: propTypes.number,
        ajaxUrl: propTypes.string.isRequired,
    }

    constructor(){
        super();
        this.state = {isFirstTime:true}
    }

    loadOptions= (inputValue, callback) => {
        if (this.state.isFirstTime){
            var value = this.props.initialValue;
            // console.log("tai");

            request({
                url:    this.props.ajaxUrl,
                method: 'GET',
                params:   {'searchText': inputValue, 'id':value}
            }).then(response => {
                var result = response.data;
                var optionsResult = result.map(item => {
                    return {label:item.label, value:item.value}
                })
                callback(optionsResult);
                this.setState({
                    isFirstTime:false,
                    defaultOptions:optionsResult
                })
            })

        }else{
            request({
                url:    this.props.ajaxUrl,
                method: 'GET',
                params:   {'searchText': inputValue, 'id':value}
            }).then(response => {
                var result = response.data;
                var optionsResult = result.map(item => {
                    return {label:item.label, value:item.value}
                })
                callback(optionsResult);
            })
        }

    }

    render() {
        var {placeholder, name, options}= this.props;
        return(
            <span className="fieldSelect">
                <Field type="email" name={name} render={({ field, form }) => {
                    var initialValue = field.value;
                    var randyValue = null;
                    if (!this.state.isFirstTime){
                        randyValue = this.state.defaultOptions ? this.state.defaultOptions.find(option => option.value === field.value) : ''
                        // console.log(randyValue);
                    }

                    return (<AsyncSelect
                        cacheOptions defaultOptions
                        styles={{
                            container: (base, state) => ({
                                ...base,
                                zIndex: "999"
                            }),
                            menu: provided => ({ ...provided, zIndex: 9999 }),
                            menuList: provided => ({ ...provided, zIndex: 9999 }),
                            menuPortal: provided => ({ ...provided, zIndex: 9999 }),
                            option: provided => ({ ...provided, zIndex: 9999 })
                        }}
                        classNamePrefix={"randy"}
                        loadOptions={this.loadOptions}
                        name={field.name}
                        placeholder={placeholder}
                        value={randyValue}
                        // value={options ? options.find(option => option.value === field.value) : ''}
                        onChange={(option) => {
                            if (option==null){
                                form.setFieldValue(field.name, null);
                                form.setFieldValue(field.name+"_label", null);
                            }else{
                                form.setFieldValue(field.name, option.value);
                                form.setFieldValue(field.name+"_label", option.label);
                            }
                        }}
                        onBlur={() => {
                            form.setFieldTouched(field.name);
                        }}
                        isClearable={true}
                    /> )} } />
            </span>);
    }
}

class FieldTextArea extends React.Component{
    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
    }

    render() {
        var {placeholder, name}= this.props;
        return (
            <Field name={name}
                   placeholder={placeholder}
                   render={({ field, form }) => {
                       return (
                           <textarea placeholder="Some placeholder" className={"form-control"} {...field}>
                               {field.value}
                           </textarea>
                       )
                   }}
            />
        );
    }
}


class FieldRadio extends React.Component {
    static propTypes = {
        name: propTypes.string.isRequired,
        customClass: propTypes.string,
        options: propTypes.array.isRequired
    }

    clickOptions(field, form, id, label) {
        if (field.value == id) {
            form.setFieldValue(field.name, null)
            form.setFieldValue(field.name + "_label", null)
        } else {
            form.setFieldValue(field.name, id)
            form.setFieldValue(field.name + "_label", label)
        }
    }
    render(){
        var {placeholder, name, options}= this.props;
        var classItem = "radioItem " + this.props.customClass;
        return (<Field type="email" name={name} render={({ field,form }) => {
            var initialValue = field.value;
            return (
                <span className={"radioSection"}>
                        {options.map((item)=> {
                            var selected = false;
                            if (field.value == item.id){
                                selected = true;
                            }
                            return (<span className={classItem} onClick={()=>{this.clickOptions(field, form, item.id, item.label)}}>
                                <span className={"radioIcon"}>
                                    <input type="radio" name={""} checked={selected}/>
                                </span>
                                <label className={"radioLabel"}>
                                    {item.label}
                                </label>

                            </span>);
                        })}
                    </span>

            )} } />
        );
    }
}



class FieldSelectOption extends React.Component{

    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        options: propTypes.array.isRequired,
    }

    populateOptions = (array, initialValue) => {
        let options = [];

        for (let i=0; i<array.length; i++){
            if (initialValue == array[i]['key']){
                options.push(<option value={array[i]['key']} key={i}>{array[i]['value']}</option>)
            } else{
                options.push(<option value={array[i]['key']} key={i}>{array[i]['value']}</option>)
            }

        }

        return options;
    }


    render() {
        var {placeholder, name, options}= this.props;
        return(
                <Field component={"select"} name={name} placeholder={placeholder} render={({ field, form }) => {
                    var initialValue = field.value;
                    if (field && field.value){
                    }

                    return (
                        <select className={"form-control md-form"} value={initialValue} {...field}>
                            {this.populateOptions(options, initialValue)}
                        </select>
                    )
                }}/>
            );
    }
}


class FieldImageUpload extends React.Component{

    static propTypes={
        name: propTypes.string.isRequired,
        placeholder: propTypes.string,
        currImage: propTypes.string,
        defaultData: propTypes.string
    }

    onClick = (event) => {
        console.log('clicked')
        $('#mediaFile').click();
    }

    dragOver = (e) => {
        $('#imageDisplay').addClass('dragging')
    }

    onDrop = (e) => {
        $('#imageDisplay').removeClass('dragging hasImage');
        if (e.originalEvent) {
            var file = e.originalEvent.dataTransfer.files[0];
            console.log(file);
            var reader = new FileReader();
            //attach event handlers here...
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                console.log(reader.result);
                $('#imageDisplay').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
            }

        }
    }

    dragLeave = (e) => {
        $('#imageDisplay').removeClass('dragging')
    }


    onChange = (e) => {
        var input = e.target;
        if (input.files && input.files[0]) {
            var file = input.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                console.log(reader.result);
                $('#imageDisplay').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
            }
        }
    }


    render() {
        var {placeholder, name, options, defaultData}= this.props;

        return(
            <div>
                <input type={"file"} name={name} id={"mediaFile"} onChange={this.onChange} style={{visibility: "hidden"}} />
                <div id={"imageDisplay"} style={{backgroundImage:"url('/user_uploads/"+defaultData+"')"}} onClick={this.onClick} onDrop={this.onDrop} onDragOver={this.dragOver} onDragLeave={this.dragLeave}>
                    <div className="dashes"></div>
                    <label>Click to browse or drag an image here</label>
                </div>
            </div>
        );
    }
}

export {
    FieldText,
    FieldPassword,
    FieldEmail,
    FieldNumber,
    FieldPercent,
    FieldDateWithSelect,
    FieldDateWithDatePicker,
    FieldSelect,
    FieldAsyncSelect,
    FieldTextArea,
    FieldRadio,
    FieldSelectOption,
    FieldImageUpload
}