import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldText, FieldNumber, FieldDateWithDatePicker} from "../../../Components/03Form/FieldType.jsx";
import request from "../../../Shared/RequestWrapper.jsx";

export default class PrimaryPropertyCreate extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,
            mg_fee: "",
            commission: "",

            initialValue: {
                project_name: "",
                agent_id: "",
                note: "",
                agent:[]
            }

        };
    }

    handleCalculateChange(e,setFieldValue,values,target) {
        // {console.log(values.net_commission)}
        setFieldValue(target,e.target.value/100*values.net_commission)
    }

    handleCommissionChange (e,setFieldValue,values) {
        setFieldValue('mg_fee_total',e.target.value*this.state.mg_fee)
        this.setState({ commission: e.target.value })
        setFieldValue('net_commission',e.target.value-(e.target.value*this.state.mg_fee))
    }

    handleMGFeeChange (e,setFieldValue,values) {
        setFieldValue('mg_fee_total',e.target.value/100*this.state.commission)
        this.setState({ mg_fee: e.target.value/100})
        setFieldValue('net_commission',this.state.commission-(e.target.value/100*this.state.commission))
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
        if (!values.agent_id) { errors.agent_id= "Agent is required" }

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

    createBasicLayout = (keyname, label, elementClass, field, errors, touched) => {
        return (
            <span className={elementClass} style={{display:"inline-block"}} key={keyname}>
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

    createBasicLayoutWithoutLabel = (keyname, label, elementClass, field, errors, touched) => {
        return (
            <span className={elementClass} style={{display:"inline-block"}} key={keyname}>
                <span className={'col-sm-12 hidden-lg hidden-xl labelSection'}>
                        <b>{label}</b>
                    </span>
                <span className={"input-group form-group col-xs-12"}>
                    {field}
                </span>
                <span className={'row col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                    {touched && errors && touched[keyname] && errors[keyname]? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
                </span>
            </span>
        );
    }

    firstBox(errors, touched, field, setFieldValue,values){
        return(
            <div className={"panel panel-default row"}>
                                    <span className={"col-sm-12"}>
                                    {this.createBasicLayout("transaction_date", "Tanggal",
                                        "col-xs-12 col-sm-12 col-md-6",
                                        <FieldDateWithDatePicker name={"transaction_date"} placeholder={"Tanggal"}/>,
                                        errors,
                                        touched
                                    )}

                                        {this.createBasicLayout("transaction_number", "Nomor Transaksi",
                                            "col-xs-12 col-sm-12 col-md-6",
                                            <FieldText name={"transaction_date"} placeholder={"Project Name"} disabled={true}/>,
                                            errors,
                                            touched
                                        )}
                                    </span>

                <span className={"col-sm-12"}>
                                    {this.createBasicLayout("agent_name", "Nama Ma",
                                        "col-xs-12 col-sm-12 col-md-6",
                                        <FieldAsyncSelect name={"agent_id"} placeholder={"Notes"} ajaxUrl={"/agent/getAgent"}/>,
                                        errors,
                                        touched
                                    )}
                                    </span>

                <span className={"col-sm-12"}>
                                    {this.createBasicLayout("total_commission", "Total Komisi",
                                        "col-xs-12 col-sm-12 col-md-6",
                                        <Field type="text" name={"total_commission"} className="form-control" placeholder={"Project Name"} onChange={(e)=>{this.handleCommissionChange(e,setFieldValue,values)}}/>,
                                        errors,
                                        touched
                                    )}
                                    </span>

                <span className={"col-sm-12"}>
                                        {this.createBasicLayout("net_commission", "Komisi Netto",
                                            "col-xs-12 col-sm-12 col-md-6",
                                            <FieldNumber name={"net_commission"} placeholder={"Komisi Net"} disabled={true}/>,
                                            errors,
                                            touched
                                        )}

                                    {this.createBasicLayout("mg_fee_percent", "MG Fee",
                                        "col-xs-12 col-sm-12 col-md-3",
                                        <Field type={"text"} name={"mg_fee_percent"} placeholder={"MG Fee"} className="form-control" suffix={"%"} onChange={(e)=>{this.handleMGFeeChange(e,setFieldValue,values)}}/>,
                                        errors,
                                        touched
                                    )}

                                    {this.createBasicLayoutWithoutLabel("mg_fee_total", "-",
                                        "col-xs-12 col-sm-12 col-md-3",
                                        <Field type="text" name={"mg_fee_total"} className="form-control" placeholder={""} disabled />,
                                        errors,
                                        touched
                                    )}
                                    </span>

            </div>
        )
    }

    secondBox(errors, touched, setFieldValue, values){
        return (
            <div className={"panel panel-default row"}>
                <span className={"col-sm-6"}>
                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent_ax", "MA x",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type="text" name={"agent_x"} placeholder={"0 %"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent_ax_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent_ax_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent_ax_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("subsidi_ax", "Subsd",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type="text" name={"subsidi_ax"} placeholder={"0 %"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"subsidi_ax_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("subsidi_ax_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"subsidi_ax_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent2_ax", "-",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type="Text" name={"agent2_ax"} placeholder={"0 %"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent2_ax_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent2_ax_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent2_ax_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent3_ax", "-",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type="Text" name={"agent3_ax"} placeholder={"0 %"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent3_ax_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent3_ax_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent3_ax_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        <div className={"col-sm-12"} >
                            <div className={"col-xs-12 totalNumber"} style={{backgroundColor:"#ccc"}}>
                                RP -
                            </div>
                        </div>
                    </span>
                </span>

                <span className={"col-sm-6"}>
                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent_bx", "MB x",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type="text" name={"agent_bx"} placeholder={"0"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent_bx_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent_bx_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent_bx_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("subsidi_bx", "MB x",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type={"text"} name={"subsidi_bx"} placeholder={"0"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"subsidi_bx_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("subsidi_bx_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"subsidi_bx_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent2_bx", "-",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type={"text"} name={"agent2_bx"} placeholder={"0"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent2_bx_total")}}/>,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent2_bx_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent2_bx_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        {this.createBasicLayout("agent3_bx", "-",
                            "col-xs-12 col-sm-6 col-md-6",
                            <Field type={"text"} name={"agent3_bx"} placeholder={"0"} className="form-control" onChange={(e)=>{this.handleCalculateChange(e,setFieldValue,values,"agent3_bx_total")}} />,
                            errors,
                            touched
                        )}

                        {this.createBasicLayoutWithoutLabel("agent3_bx_total", "Rp",
                            "col-xs-12 col-sm-6 col-md-6",
                            <FieldNumber name={"agent3_bx_total"} placeholder={"0"} disabled={true}/>,
                            errors,
                            touched
                        )}
                    </span>

                    <span className={"col-sm-12"}>
                        <div className={"col-sm-12"} >
                            <div className={"col-xs-12 totalNumber"} style={{backgroundColor:"#ccc"}}>
                                RP -
                            </div>
                        </div>
                    </span>
                </span>
            </div>
        )
    }

    thirdBox(errors, touched){
        return(
            <div className={"panel panel-default row"}>
                                    <span className={"col-sm-12"}>
                                    {this.createBasicLayout("transaction_date", "PPH 21 <= 50x",
                                        "col-sm-6",
                                        <FieldText name={"transaction_date"} placeholder={"Tanggal"}/>,
                                        errors,
                                        touched
                                    )}
                                    </span>

                <span className={"col-sm-12"}>
                                    {this.createBasicLayout("transaction_date", "50 - <= 250x",
                                        "col-sm-6",
                                        <FieldText name={"transaction_date"} placeholder={"Tanggal"}/>,
                                        errors,
                                        touched
                                    )}
                                    </span>
            </div>
        );
    }

    // RENDER
    render() {
        var initialValue = this.props.initialValue?this.props.initialValue:this.state.initialValue;
        return (
            <Formik initialValues={initialValue}
                    validate={this.fieldValidation}
                    render={({values, errors, status, touched, isSubmitting, setFieldValue, field}) => (
                        <Form action={this.state.urlLogin} method="post" className={"formTransaction"}>
                                <input type="hidden" name="_token" value={csrf_token}/>
                                {this.firstBox(errors, touched, field, setFieldValue,values)}
                                {this.secondBox(errors, touched, setFieldValue, values)}
                                {this.thirdBox(errors, touched)}


                            <div className="form-group">
                                <input type="submit" value="SUBMIT"
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
                            </div>

                        </Form>
                    )}
                    onSubmit={this.submitForm}
            />
        )
    }
}