import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldText, FieldNumber} from "../../../Components/03Form/FieldType.jsx";
import request from "../../../Shared/RequestWrapper.jsx";

const FormCol1Layout = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
                <span className={"col-md-12"}>
                {props.field1}
            </span>
        </span>
}

const FormCol2Layout = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-md-6"}>
                {props.field1}
            </span>
            <span className={"col-md-6"}>
                {props.field2}
            </span>
    </span>

}

export  default class PrimaryPropertyCreate extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,

            initialValue: {
                project_name: "",
                agent_lister_id: "",
                note: "",
                agent:[]
            }

        };
    }

    componentWillMount() {
        var createAjaxCall = "/"+baseUrl+"/create/";
        var submitAjaxCall = this.props.submitAjaxCall?this.props.submitAjaxCall:createAjaxCall;
        this.setState({submitAjaxCall:submitAjaxCall,})
    }

    // FORM RELATED
    fieldValidation = (values) => {
        let errors = {};
        if (!values.project_name) { errors.project_name = "Project is required" }
        if (!values.agent_lister_id) { errors.agent_lister_id= "Agent is required" }

        return errors;
    }

    submitForm  = (values, actions) => {
        request({
            url: this.state.submitAjaxCall,
            method: 'post',
            params:   values
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                // window.location.href = "/"+this.state.baseUrl;
            }else{

            }
        })
    }

    createBasicLayout = (keyname, label, field, errors, touched) => {
        return (
            <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12"} style={{display:"inline-block"}} key={keyname}>
                <span className={"input-group form-group col-xs-12"}>
                    <span className={'col-sm-12 col-lg-3 labelSection'}>
                        <b>{label}</b>
                    </span>
                    <span className={'col-sm-12 col-lg-9 inputSection'}>
                        {field}
                    </span>
                    <span className={'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                        {touched && errors && touched[keyname] && errors[keyname]? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
                    </span>
                </span>
            </span>
        );
    }
    basicLayout = (keyname, label, errors, touched, field) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-lg-3 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-sm-12 col-lg-9 inputSection'}>
                {field}
            </span>
            <span className={'col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                {touched && errors && touched[keyname] && errors[keyname]? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
            </span>
        </React.Fragment>)
    }

    // RENDER
    render() {
        var initialValue = this.props.initialValue?this.props.initialValue:this.state.initialValue;
        return (
            <Formik initialValues={initialValue}
                    validate={this.fieldValidation}
                    onSubmit={this.submitForm}
                    render={({values, errors, status, touched, isSubmitting, form}) => (
                        <Form action={this.state.urlLogin} method="post">
                            <input type="hidden" name="_token" value={csrf_token}/>

                            <FormCol1Layout
                                field1={this.basicLayout("project_name","Project Name", errors, touched,
                                    <FieldText name={"project_name"} placeholder={"Project Name"}/>, )}
                            />

                            <FormCol1Layout
                                field1={this.basicLayout("note","Notes", errors, touched,
                                    <FieldTextArea name={"note"} placeholder={"Notes"}/>, )}
                            />

                            <hr/>

                            <FormCol1Layout
                                field1={this.basicLayout("agent_id","Pelisting", errors, touched,
                                    <FieldAsyncSelect name={"agent_lister_id"} placeholder={"Pelisting"} ajaxUrl={"/agent/getAgent"}/>, )}
                            />

                            <FormCol1Layout
                                field1={this.basicLayout("komisi_pelisting","Komisi Pelisting", errors, touched,
                                    <FieldNumber name={"percent_listing_commission"} placeholder={"Komisi"}/>, )}
                            />


                            <hr/>

                            <div className={"col-xs-12 "} >
                                <h1> Koordinator </h1>
                                <br/>
                            </div>

                            {
                                [0,1,2].map(i => {
                                    return (
                                        <div className={"col-xs-6"} style={{borderRight:"1px solid  #ccc"}}>
                                            <FormCol1Layout
                                                field1={this.basicLayout("agent["+i+"].id","Agent Name", errors, touched,
                                                    <FieldAsyncSelect name={"agent["+i+"].id"} placeholder={"Agent"} ajaxUrl={"/agent/getAgent"}/>, )}
                                            />

                                            <FormCol1Layout
                                                field1={this.basicLayout("agent["+i+"].no_id", "No Id", errors, touched,
                                                    "Nomor Id", )}
                                            />

                                            <FormCol1Layout
                                                field1={this.basicLayout("agent["+i+"].percent_commission", "Komisi", errors, touched,
                                                    <FieldText name={"agent["+i+"].percent_commission"} placeholder={"Komisi"}/>, )}
                                            />
                                        </div>
                                    )
                                })
                            }

                            <div className="form-group">
                                <input type="submit" value="LOGIN"
                                       className="btn float-right login_btn btn-primary form-control"/>
                            </div>

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
        )
    }
}