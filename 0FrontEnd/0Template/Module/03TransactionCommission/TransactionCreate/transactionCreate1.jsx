import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldPercent, FieldText, FieldNumber, FieldDateWithDatePicker} from "../../../Components/03Form/FieldType.jsx";
import propTypes from "prop-types";
import galaxyHelper from "../../../Shared/GalaxyHelper.jsx"
import {
    FormCol2Layout,
    LinePlus,
    basicLayout
} from "./sharedColumnForm.jsx"


export default class TransactionCreate1 extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        console.log("gila a");

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall
            //
            // initialValue: {
            //     date:'',
            //     project_name: "",
            //     agent_lister_id: "",
            //     note: "",
            //     agent:[],
            //     mg_fee_percent:this.props.relatedData.mgfee ? this.props.relatedData.mgfee
            // }

        };
    }

    static propTypes={
        relatedData: propTypes.array,
        formData: propTypes.array
    }

    static defaultProps = {
        relatedData:[],
        formData:[]
    }

    componentWillMount() {
        console.log(this.props);
        var createAjaxCall = "/"+baseUrl+"/create/";
        var submitAjaxCall = this.props.submitAjaxCall?this.props.submitAjaxCall:createAjaxCall;

        var mgFee = 9;
        if (this.props.formData.mgfee){
            mgFee = this.props.formData.mgfee
        }else if (this.props.relatedData.mgfee){
            mgFee = this.props.relatedData.mgfee
        }

        var initialValue = {
            date:this.props.formData.date?this.props.formData.date:galaxyHelper.dateToDMY(new Date()),
            agent_id: this.props.formData.agent_id,
            agent_id_label: this.props.formData.agent_id_label,
            property_id: this.props.formData.property_id,
            property_note_name: this.props.formData.property_note_name,
            property_note: this.props.formData.property_note,
            property_id_label: this.props.formData.property_id_label,
            property_value:this.props.formData.property_value,
            percent_commission:this.props.formData.percent_commission,
            mg_fee_percent:mgFee,
            biaya_lain_1:this.props.formData.biaya_lain_1,
            biaya_lain_2:this.props.formData.biaya_lain_2,
            transaction_number: this.props.formData.transaction_number
        };
        this.state.initialValue = initialValue;
        this.countKomisi(initialValue, this.setRandyInitialValue);

        this.setState({
            submitAjaxCall:submitAjaxCall,
            initialValue: initialValue
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    setRandyInitialValue = (key, value) => {
        var keys = key.split(".");
        var a = this.state.initialValue;
        for (let i = 0; i < keys.length; i++) {
            var strKey = keys[i];
            if (i + 1 == keys.length) {
                a[strKey] = value;
            } else {
                a = a[strKey];
            }
        }
    }

    // FORM RELATED
    fieldValidation = (values) => {
        let errors = {};
        if (!values.date){
            errors.date = "the date required";
        }
        return errors;
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
                {touched && errors && touched[keyname] && errors[keyname] ? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
            </span>
        </React.Fragment>)
    }

    countKomisi = (values, setFieldValue) => {
        var newStartCommission = 0;
        if (values.property_value && values.percent_commission){
            var str = values.property_value.replace(/\./g, "");
            var propertyValueInt= parseInt(str);
            var percentCommissionInt= parseFloat(values.percent_commission);
            var biaya_lain_1 = 0;
            if(!!values.biaya_lain_1)
                biaya_lain_1=parseInt(values.biaya_lain_1.replace(/\./g, ""));
            newStartCommission = propertyValueInt * percentCommissionInt/100 - biaya_lain_1;
            setFieldValue("start_commission", Math.floor(newStartCommission));
        }

        if (newStartCommission && values.mg_fee_percent){
            var mgFeePercent= parseFloat(values.mg_fee_percent);
            var biaya_lain_2 = 0;
            if(!!values.biaya_lain_2)
                biaya_lain_2=parseInt(values.biaya_lain_2.replace(/\./g, ""));
            var lastCommission = newStartCommission - (newStartCommission * mgFeePercent / 100) - biaya_lain_2;
            setFieldValue("last_commission", Math.floor(lastCommission));
        }
        console.log("count count");
    }

    submitForm = (values, action) => {
        this.props.onSubmit(2, values);
    }

    // RENDER
    render() {
        var initialValue = this.props.initialValue?this.props.initialValue:this.state.initialValue;
        return (
            <div className={"transaction-form"}>
                <Formik initialValues={initialValue}
                        validate={this.fieldValidation}
                        onSubmit={this.submitForm}
                        render={({values, errors, status, touched, isSubmitting, setFieldValue, form}) => (
                            <Form action={this.state.urlLogin} method="post">
                                <input type="hidden" name="_token" value={csrf_token}/>
                                <div className={"box transaction-box"}>
                                    <FormCol2Layout
                                        field1={this.basicLayout("date","Tanggal", errors, touched,
                                            <FieldDateWithDatePicker name="date" placeholder="Masukkan Tanggal" dateFormat={"dd-MM-yyyy"} form={form}/> )}
                                        field2={this.basicLayout("transaction_number","number", errors, touched,
                                            <FieldText name={"transaction_number"} placeholder={"____-___"} disabled={true}/>)}
                                    />

                                    <FormCol2Layout
                                        field1={this.basicLayout("agent_id","Agent", errors, touched,
                                            <FieldAsyncSelect name={"agent_id"} placeholder={"Agent Name"} ajaxUrl={"/agent/getAgent"}/>, )}
                                    />

                                    {/*<FormCol2Layout*/}
                                        {/*field1={this.basicLayout("property_id","Nama Property", errors, touched,*/}
                                            {/*<FieldAsyncSelect name={"property_id"} placeholder={"Property Name"} ajaxUrl={"/agent/getPrimaryProject"}/>, )}*/}
                                    {/*/>*/}

                                    <FormCol2Layout
                                        field1={this.basicLayout("property_note_name","Nama Property", errors, touched,
                                            <FieldText name={"property_note_name"} placeholder={"Property Name"} />, )}
                                    />

                                    <FormCol2Layout
                                        field1={this.basicLayout("property_note","Note Property", errors, touched,
                                            <FieldTextArea name={"property_note"} placeholder={"Property Name"} />, )}
                                    />

                                    <FormCol2Layout
                                        field1={this.basicLayout("property_value","Property Value", errors, touched,
                                            <FieldNumber name={"property_value"} placeholder={"masukkan harga bangunan"} onBlur={()=>this.countKomisi(values, setFieldValue)}/> )}
                                    />
                                    <FormCol2Layout
                                        field1={this.basicLayout("percent_commission","Transaksi Komisi", errors, touched,
                                            <FieldPercent name={"percent_commission"} placeholder={"persen Komisi"} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                    />
                                    <FormCol2Layout
                                        field1={this.basicLayout("biaya_lain_1","Biaya lain-lain (-)", errors, touched,
                                            <FieldNumber name={"biaya_lain_1"} placeholder={"masukkan biaya lain-lain"} onBlur={()=>this.countKomisi(values, setFieldValue)}/> )}
                                    />

                                    {/* ========================= */}
                                    <span className={"col-xs-12 col-md-6"}>
                                <LinePlus />
                            </span>
                                    <span className={"calculation-result total-pph-section"}>
                                <FormCol2Layout
                                    field1={this.basicLayout("start_commissison","Komisi Awal", errors, touched,
                                        <FieldNumber name={"start_commission"} placeholder={"0"} disabled={true}/> )}
                                />
                            </span>

                                    <FormCol2Layout
                                        field1={this.basicLayout("mg_fee_percent","MF fee", errors, touched,
                                            <FieldPercent name={"mg_fee_percent"} placeholder={"Biaya Management"} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                    />

                                    <FormCol2Layout
                                        field1={this.basicLayout("biaya_lain_2","Biaya lain-lain (-)", errors, touched,
                                            <FieldNumber name={"biaya_lain_2"} placeholder={"masukkan biaya lain-lain"} onBlur={()=>this.countKomisi(values, setFieldValue)}/> )}
                                    />

                                    <span className={"col-xs-12 col-md-6"}>
                                <LinePlus />
                            </span>
                                    <span className={"calculation-result"}>
                                <FormCol2Layout
                                    field1={this.basicLayout("last_commission","Komisi Akhir", errors, touched,
                                        <FieldNumber name={"last_commission"} placeholder={"0"} disabled={true} /> )}
                                />
                            </span>
                                </div>

                                <input type="submit" value="NEXT" className="btn float-right login_btn btn-primary form-control"/>


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
                />
            </div>
        )
    }
}