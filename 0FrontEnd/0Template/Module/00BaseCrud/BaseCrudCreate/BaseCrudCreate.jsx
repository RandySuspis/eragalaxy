import  React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import "./BaseCrudCreate.scss";
import { FieldText, FieldEmail, FieldNumber,
        FieldDateWithDatePicker, FieldSelect, FieldTextArea, MyDatePicker } from "../../../Components/03Form/FieldType.jsx"
import request from "../../../Shared/RequestWrapper.jsx";
import {FieldAsyncSelect} from "../../../Components/03Form/FieldType.jsx";

// First, you need to create the `numberMask` with your desired configurations

const RandyValidation = (key, value, validationRule, label)=>{
    // Start to check the Validation
    if (key && validationRule){
        var validations = validationRule.split("|");
        for (let j = 0; j < validations.length; j++) {
            var validation = validations[j];
            // Check validation 1 by 1
            if (validation.includes("require")){
                if (!value || value==="" || value===null) {return label + " is required"}
            }

            if (validation.includes("min:")){
                var minNumber = validation.replace("min:","");
                var number = parseInt(minNumber);
                var strValue = value+"";
                if (strValue.length < number){
                    {return label + " have minimal of "+number+" characters"}
                }
            }

            if (validation.includes("max:")){
                var maxNumber = validation.replace("max:","");
                var number = parseInt(maxNumber);
                var strValue = value+"";
                if (strValue.length > number){
                    {return label + " have maximal of "+number+" characters"}
                }
            }

            if (validation.includes("numeric")){
                var isnum = /^\d+$/.test(value);
                if (!isnum){
                    {return label + " is numeric only"}
                }
            }

        }
    }
    return undefined;
}

class BaseCrudCreate extends React.Component{

    constructor(){
        super();
        var inputStructure = window.inputStructure?window.inputStructure:[];
        var inputStructureKey = Object.keys(inputStructure);
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        this.myForm = React.createRef();

        // Generate Initial Value from InputStructure
        var initialValue = {};
        inputStructureKey.map(inputColumnKey => {
            var inputColumn = inputStructure[inputColumnKey];
            var theField = null;
            initialValue[inputColumnKey] = '';
        });

        var ajaxCall = "/"+baseUrl+"/create";
        this.state = {
            // Data
            inputStructure: inputStructure,
            inputStructureKey: inputStructureKey,
            baseUrl:baseUrl,
            ajaxCall:ajaxCall,
            initialValue:initialValue
        }

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

    doHtmlFormPost = values => {
        document.getElementById("formReference").submit();
    }

    doAjaxFormPost = values => {
        request({
            url:    this.state.ajaxCall,
            method: 'POST',
            params:   values
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                window.location.href = "/"+this.state.baseUrl;
            }else{

            }
        })
    }

    debugSubmitting = (values, setSubmitting) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 4000);
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
        return (
            <div className={"baseCrudCreate"}>
                <Formik
                    initialValues={this.state.initialValue}
                    validate={this.fieldValidation}
                    onSubmit={this.submitForm}
                    structure={this.state.inputStructure}
                    render={({ values, errors, status, touched, isSubmitting, form, handleChange, handleBlur}) => (
                        <Form action={this.state.ajaxCall} method="POST" id={"formReference"}>
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

export default BaseCrudCreate;