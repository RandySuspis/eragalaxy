import  React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import "../BaseCrudCreate/BaseCrudCreate.scss";
import { FieldText, FieldEmail, FieldNumber,
        FieldDateWithDatePicker, FieldSelect, FieldAsyncSelect, FieldTextArea } from "../../../Components/03Form/FieldType.jsx"

import request from "../../../Shared/RequestWrapper.jsx"

// First, you need to create the `numberMask` with your desired configurations

const testOptions = [
    { value: 'Choco', label: 'Chocolate' },
    { value: 'Strawberry', label: 'Strawberry' },
    { value: 'Vanilla', label: 'Vanilla' }
]

const RandyValidation = (key, value, validationRule, label)=>{
    // Start to check the Validation
    if (key && validationRule){
        var validations = validationRule.split("|");
        for (let j = 0; j < validations.length; j++) {
            var validation = validations[j];
            // Check validation 1 by 1
            if (validation.includes("require")){
                if (!value) {return label + " is required"}
            }

            if (validation.includes("min:")){
                var minNumber = validation.replace("min:","");
                var number = parseInt(minNumber);
                if (value.length < number){
                    {return label + " have minimal of "+number+" characters"}
                }
            }

            if (validation.includes("max:")){
                var maxNumber = validation.replace("max:","");
                var number = parseInt(maxNumber);
                if (value.length > number){
                    {return label + " have maximal of "+number+" characters"}
                }
            }

        }
    }
    return undefined;
}

class BaseCrudUpdate extends React.Component{

    constructor(){
        super();
        var inputStructure = window.inputStructure?window.inputStructure:[];
        var inputStructureKey = Object.keys(inputStructure);
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var dataId = window.dataId?window.dataId:null;
        this.myForm = React.createRef();

        // Generate Initial Value from InputStructure
        var initialValue = {};
        inputStructureKey.map(inputColumnKey => {
            var inputColumn = inputStructure[inputColumnKey];
            var theField = null;
            initialValue[inputColumnKey] = '';
        });

        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var updateAjaxCall = "/"+baseUrl+"/update/"+dataId;
        this.callInitialData(ajaxCall, dataId);

        this.state = {
            // Data
            inputStructure: inputStructure,
            inputStructureKey: inputStructureKey,
            baseUrl:baseUrl,
            ajaxCall:ajaxCall,
            updateAjaxCall:updateAjaxCall,
            initialValue:null,
            dataId:dataId
        }

    }

    callInitialData = (ajaxCall, dataId)=>{

        request({
            url:    ajaxCall,
            method: 'GET',
            params:   {
                'id': dataId
            }
        }).then(response => {
            this.setState({
                initialValue: response.data.data,
            });
        });

    }

    fieldValidation = (values) => {
        let errors = {};
        var columnStructure = this.state.inputStructure;
        var keys = Object.keys(values);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = values[key];
            if (columnStructure[key]){
                var validationRule = columnStructure[key].validation;
                if (key in columnStructure){
                    var label = columnStructure[key].label;
                    var errorString = RandyValidation(key,value,validationRule,label);
                    if (errorString){
                        errors[key] = errorString;
                    }
                }
            }
        }
        console.log(errors);
        return errors;
    }

    doAjaxFormPost = values => {
        request({
            url:    this.state.updateAjaxCall,
            method: 'POST',
            params:   values
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                window.location.href = "/"+this.state.baseUrl+"/list";
            }else{
                window.location.href = "/"+this.state.baseUrl+"/list";
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    submitForm  = (values, actions) => {
        // Check if there's any error
        // this.doAjaxFormPost(values);
        // this.debugSubmitting(values, actions.setSubmitting)
        this.doAjaxFormPost(values)
        // return true;
    }

    render() {
        var inputColumnTest = this.state.inputStructure["Name"];
        var groupSize = 2;
        if (!this.state.initialValue){
            return null;
        }
        return (
            <div className={"baseCrudUpdate"}>
                <Formik
                    initialValues={this.state.initialValue}
                    validate={this.fieldValidation}
                    onSubmit={this.submitForm}
                    structure={this.state.inputStructure}
                    render={({ values, errors, status, touched, isSubmitting, form}) => (
                        <Form action={"/"+this.state.baseUrl+"/create"} method="POST" id={"formReference"} key={'asdf'}>
                            {
                                this.state.inputStructureKey.map(inputColumnKey => {
                                    var inputColumn = this.state.inputStructure[inputColumnKey];
                                    var theField = null;

                                    switch (inputColumn.type) {
                                        case "text":
                                            theField = <FieldText name={inputColumn.name} placeholder={inputColumn.placeholder}/>
                                            break;
                                        case "number":
                                            theField = <FieldNumber name={inputColumn.name} placeholder={inputColumn.placeholder} separator={""}/>
                                            break
                                        case "decimal":
                                            theField = <FieldNumber name={inputColumn.name} placeholder={inputColumn.placeholder}/>
                                            break
                                        case "date":
                                            theField = <FieldDateWithDatePicker name={inputColumn.name} placeholder={inputColumn.placeholder} form={form}/>
                                            break
                                        case "email":
                                            theField = <FieldEmail name={inputColumn.name} placeholder={inputColumn.placeholder}/>
                                            break
                                        case "select":
                                            theField = <FieldAsyncSelect name={inputColumn.name}
                                                                         placeholder={inputColumn.placeholder}
                                                                         options={testOptions}
                                                                         ajaxUrl={inputColumn.optionAjax}
                                                                         initialValue={this.state.initialValue[inputColumn.name]}
                                            />;
                                            break
                                        case "textarea":
                                            theField = <FieldTextArea name={inputColumn.name} placeholder={inputColumn.placeholder}/>;
                                            break
                                        default:
                                            break
                                    }

                                    return(
                                        <span className={"col-xs-12 col-md-8 col-md-6 col-lg-6"} style={{display:"inline-block"}} key={inputColumnKey}>
                                            <span className={"input-group form-group col-xs-12"}>
                                                <span className={'col-sm-12 col-lg-3 labelSection'}>
                                                    <b>{inputColumn.label}</b>
                                                </span>
                                                <span className={'col-sm-12 col-lg-9 inputSection'}>
                                                    {theField}
                                                </span>
                                                <span className={'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                                                    {touched[inputColumnKey] && errors[inputColumnKey]? <div className={"errorMessage"}>{errors[inputColumnKey]}</div> : null}

                                                    {/*<ErrorMessage name={inputColumn.name} component="div" className={"errorMessage"}/>*/}
                                                </span>
                                            </span>
                                        </span>)
                                }).reduce( (r,element,index) =>{
                                    index % groupSize === 0 && r.push([]);
                                    r[r.length - 1].push(element);
                                    return r;
                                },[]).map(rowContent => {
                                    return <div className="row" style={{marginBottom:"10px"}}>{rowContent}</div>
                                })
                            }

                            <input type="hidden" name="_token" value={window.csrf_token}/>
                            <div className={"row"}>
                                <div style={{display:'block'}} className={'col-xs-12'}>
                                    <label>Error:</label><br/>
                                    <code>{errors?JSON.stringify(errors):""}</code><br/>
                                    <label>Touched:</label><br/>
                                    <code>{touched?JSON.stringify(touched):""}</code><br/>
                                    <label>Value:</label><br/>
                                    <code>{values?JSON.stringify(values):""}</code><br/>
                                </div>
                                <div style={{display:'block'}} className={'col-xs-12'}>
                                    <input type="submit" className={"btn btn-primary btn-submit-randy"} value={"Submit"} />
                                </div>
                            </div>

                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default BaseCrudUpdate;