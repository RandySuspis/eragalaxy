import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldRadio, FieldPercent, FieldText, FieldNumber, FieldDateWithDatePicker} from "../../../Components/03Form/FieldType.jsx";
import GalaxyHelper from "../../../Shared/GalaxyHelper.jsx"
import {
    FormCol1Layout,
    FormCol2Layout,
    FormCol2Layout2,
    FormCol2PPHSection,
    FormCol4BonusSection,
    LinePlus
} from "./sharedColumnForm.jsx"
import propTypes from "prop-types";

export default class TransactionPrimaryCreate2 extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        console.log("gila a");

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,
        };
    }

    componentWillMount() {
        console.log(this.props);
        var createAjaxCall = "/"+baseUrl+"/create/";
        var submitAjaxCall = this.props.submitAjaxCall?this.props.submitAjaxCall:createAjaxCall;
        var initialValue = {
            langsungCair: 1,
            pph_1: this.props.formData.pph_1? this.props.formData.pph_1:this.props.relatedData.taxData.pph_1,
            pph_2: this.props.formData.pph_2? this.props.formData.pph_2:this.props.relatedData.taxData.pph_2,
            pph_3: this.props.formData.pph_3? this.props.formData.pph_3:this.props.relatedData.taxData.pph_3,
            pph_4: this.props.formData.pph_4? this.props.formData.pph_4:this.props.relatedData.taxData.pph_4,

            commission_1: this.props.formData.commission_1? this.props.formData.commission_1:this.props.relatedData.agentData.commission_percent[0],
            commission_2: this.props.formData.commission_2? this.props.formData.commission_2:this.props.relatedData.agentData.commission_percent[1],
            commission_3: this.props.formData.commission_3? this.props.formData.commission_3:this.props.relatedData.agentData.commission_percent[2],
            commission_4: this.props.formData.commission_4? this.props.formData.commission_4:this.props.relatedData.agentData.commission_percent[3],

            commission_1_value: this.props.relatedData.agentData.commission_calculate[0],
            commission_2_value: this.props.relatedData.agentData.commission_calculate[1],
            commission_3_value: this.props.relatedData.agentData.commission_calculate[2],
            commission_4_value: this.props.relatedData.agentData.commission_calculate[3],

            ppn: this.props.formData.ppn? this.props.formData.ppn:this.props.relatedData.taxData.ppn,
            previous_commission: this.props.relatedData.agentData.commission_gross,
            agent_percent_commission: this.props.formData.agent_percent_commission? this.props.formData.agent_percent_commission:this.props.relatedData.agentData.percent_commission,
            office_percent_commission: this.props.formData.office_percent_commission? this.props.formData.office_percent_commission:this.props.relatedData.agentData.office_commission,
            input_commission:this.props.lastCommission,
            commission_value:this.props.relatedData.agentData.total_agent,
            office_value:this.props.relatedData.agentData.total_office,

            biaya_lain_3:this.props.formData.biaya_lain_3,
            subsd:this.props.formData.subsd,
        };

        if (this.props.relatedData.lister){
            initialValue.lister_percent = this.props.relatedData.lister.percent;
            initialValue.lister_name = this.props.relatedData.lister.name;
            initialValue.lister_id = this.props.relatedData.lister.id;
        }

        if (this.props.relatedData.coor){
            let coord = this.props.relatedData.coor;
            initialValue["koor"] = [];
            for (let i = 0; i < coord.length; i++) {
                var theCoor = coord[i];
                initialValue["koor"][i+1] = {};
                var theValue = initialValue["koor"][i+1];
                theValue.percent = theCoor.percent;
                theValue.name = theCoor.name;
                theValue.id = theCoor.id;
            }
        }


        this.state.initialValue = initialValue;

        var bonusDataKeys = Object.keys(this.props.relatedData.bonusData);
        initialValue.bonus = {};
        for (let i = 0; i < bonusDataKeys.length; i++) {
            var key = bonusDataKeys[i];
            var bonusData = this.props.relatedData.bonusData[key];
            initialValue.bonus[key] = {};

            initialValue.bonus[key]["percent"] = bonusData.bonus;
            initialValue.bonus[key]["name"] = bonusData.name;
            initialValue.bonus[key]["id"] = bonusData.id;
            initialValue.bonus[key]["label"] = key;
        }
        initialValue.termin_1 = {}
        initialValue.termin_1.percent = 50;
        initialValue.termin_2 = {}
        initialValue.termin_2.percent = 50;

        this.countKomisi(initialValue, this.setRandyInitialValue)

        this.setState({
            firstTime:true,
            submitAjaxCall:submitAjaxCall,
            initialValue: initialValue
        })
    }

    setRandyInitialValue = (key, value) => {
        var keys = key.split(".");
        var a = this.state.initialValue;
        for (let i = 0; i < keys.length; i++) {
            var strKey = keys[i];
            if (!a[strKey]){ a[strKey] = []; }
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

        return errors;
    }

    submitForm  = (values, actions) => {
        this.props.onSubmit(3, values);
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

    basicLayoutRupiah = (keyname, label, errors, touched, field) => {
        return (<React.Fragment>
            <span className={'col-xs-1 col-lg-2 labelSection'} style={{width:"10%", paddingRight:"10px", paddingLeft:"10px"}}>
                <b>{label}</b>
                </span>
            <span className={'col-xs-11 col-lg-10 inputSection'} style={{width:"90%"}}>
                {field}
            </span>
            <span className={'col-xs-12 col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                {touched && errors && touched[keyname] && errors[keyname]? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
            </span>
        </React.Fragment>)
    }

    basicLayoutPercentField = (keyname, label, errors, touched, field) => {
        return (<React.Fragment>
            <span className={'col-xs-5 col-sm-5 col-lg-5 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-xs-7 col-sm-7 col-lg-7 inputSection'}>
                {field}
            </span>
            <span className={'col-xs-12 col-sm-12 col-lg-offset-3 col-lg-9 errorSection'}>
                {touched && errors && touched[keyname] && errors[keyname]? <div className={"errorMessage"}>{errors[keyname]}</div> : null}
            </span>
        </React.Fragment>)
    }

    countKomisi = (values, setFieldValue) => {

        /* - Randy -
        * 0. Start Setting the Values
        * 1. Calculate Lister & Coordinator
        * 2. Calculate Agent Commission
        * 3. Count Office Commission
        */

        var commissionValue = 0;
        var subsdValue = 0;
        var agentXValue = 0;
        var totalCommission = 0;
        var input_commission= values.input_commission + "";
        input_commission = input_commission.replace(/\./g, "")
        input_commission = parseInt(input_commission);
        var input_commission_wo_coor = input_commission;

        // ==== Calculate the Lister & Koordinator ====
        if (values.lister_percent && values.input_commission){
            var percentCommissionInt = parseFloat(values.lister_percent);
            setFieldValue("lister_value", Math.floor(input_commission *(percentCommissionInt/100)));
            input_commission_wo_coor = input_commission_wo_coor - Math.floor(input_commission *(percentCommissionInt/100));
        }

        if (values.koor && values.input_commission){
            for (let i = 0; i < values.koor.length; i++) {
                let theValue = values.koor[i+1];
                if (theValue){
                    var percentCommissionInt = parseFloat(theValue.percent + "");
                    var calculation = Math.floor(input_commission *(percentCommissionInt/100));
                    setFieldValue("koor."+(i+1)+".value", calculation);
                    input_commission_wo_coor = input_commission_wo_coor - calculation;
                }
            }
        }

        if (true){
            setFieldValue("input_commission_wo_coor", input_commission_wo_coor);
            input_commission = input_commission_wo_coor;
        }

        // ==== Calculate the Percent Commission ====
        if (values.input_commission ){
            var percentCommissionInt = parseFloat(values.agent_percent_commission);
            commissionValue = values.commission_value;
            totalCommission = commissionValue + subsdValue + agentXValue;
            setFieldValue("commission_value", Math.floor(commissionValue));
            setFieldValue("total_commission", Math.floor(totalCommission));
            // setup the office Value
        }

        if (values.subsd && values.input_commission){
            var percentCommissionInt = parseFloat(values.subsd);
            subsdValue = input_commission * percentCommissionInt/100;
            totalCommission = commissionValue + subsdValue + agentXValue;
            setFieldValue("subsd_value", Math.floor(subsdValue));
            setFieldValue("total_commission", totalCommission);

            setFieldValue("office_subsd", values.subsd);
            setFieldValue("office_subsd_value", Math.floor(subsdValue));
        } else {
            setFieldValue("subsd", 0);
            setFieldValue("subsd_value", 0);
        }

        if (values.agent_x && values.input_commission){
            var percentCommissionInt = parseFloat(values.agent_x);
            agentXValue = input_commission * percentCommissionInt/100;
            totalCommission = commissionValue + subsdValue + agentXValue;
            setFieldValue("agent_x_value", Math.floor(agentXValue));
            setFieldValue("total_commission", totalCommission);
        }

        //  ===== CALCULATE PPH ====
        let limitTrue = [50, 250, 500, 9999999];
        let limitSelisih = [50, 200, 250, 9999999];
        let percent = [values.pph_1?parseFloat(values.pph_1):0,
            values.pph_2?parseFloat(values.pph_2):0,
            values.pph_3?parseFloat(values.pph_3):0,
            values.pph_4?parseFloat(values.pph_4):0];
        let resultPPH = GalaxyHelper.CalculatePPH(parseInt(values.previous_commission+""), totalCommission, limitSelisih, percent)

        var totalPPh = 0;
        for (let i = 0; i < resultPPH.length; i++) {
            var pph = resultPPH[i];
            totalPPh = totalPPh + pph;
            if (i == 0){ setFieldValue("pph_1_value", pph) }
            if (i == 1){ setFieldValue("pph_2_value", pph) }
            if (i == 2){ setFieldValue("pph_3_value", pph) }
            if (i == 3){ setFieldValue("pph_4_value", pph) }
        }
        setFieldValue("total_pph",totalPPh);

        var biaya_lain_3 = 0;

        if(!!values.biaya_lain_3)
            biaya_lain_3 = parseInt(values.biaya_lain_3.replace(/\./g, ""));

        setFieldValue("total", Math.floor(totalCommission - totalPPh - biaya_lain_3))

        this.countKomisiOffice(values, setFieldValue);
    }

    countKomisiOffice = (values, setFieldValue) => {

        /* - Randy -
        * 0. Start Setting initial Office Value
        * 1. Calculate PPN
        * 2. Calculate Subsidy
        * 3. Calculate Bonus
        */

        // var bonusStartCommission = 0;
        var startCommission = values.input_commission_wo_coor?parseInt(values.input_commission_wo_coor+""):0;
        var totalOffice = values.office_value;

        if (true){

            setFieldValue("office_percent_commission", (100-values.agent_percent_commission));

            setFieldValue("office_value", totalOffice);
        }

        if (values.ppn && values.input_commission){
            var input_commission= values.input_commission + "";
            input_commission = input_commission.replace(/\./g, "")
            input_commission = parseInt(input_commission);

            var percentCommissionInt = parseFloat(values.ppn);
            var commissionValue = Math.floor(input_commission * percentCommissionInt/100);
            setFieldValue("ppn_value", commissionValue);
            totalOffice = totalOffice - commissionValue;
        }else{
            setFieldValue("ppn_value", null);
        }

        if (values.subsd && values.input_commission){
            var percentCommissionInt = parseFloat(values.subsd);
            setFieldValue("office_subsd", percentCommissionInt);
            setFieldValue("office_subsd_value", (percentCommissionInt/100 * startCommission));
            totalOffice = totalOffice - values.office_subsd_value;
        }else{
            setFieldValue("office_subsd", 0);
            setFieldValue("office_subsd_value", 0);
        }
        var bonusStartCommission = totalOffice;

        // start to count for the bonus
        if (values.bonus){
            var bonusDataKeys = Object.keys(values.bonus);
            for (let i = 0; i < bonusDataKeys.length; i++) {
                var key = bonusDataKeys[i];
                var bonusData = values.bonus[key];
                var percent = parseFloat(bonusData.percent+"");
                setFieldValue("bonus."+key+".value", bonusStartCommission * (percent/100));
                totalOffice = Math.floor(totalOffice - bonusStartCommission * (percent/100));
            }
        }

        setFieldValue("total_office", Math.floor(totalOffice));

        this.countTermin(values, setFieldValue);

    }

    countTermin = (values, setFieldValue) => {

        var termin1 = parseFloat(values.termin_1.percent+'');
        var termin2 = 100 - termin1;
        setFieldValue("termin_1.percent", termin1);
        setFieldValue("termin_2.percent", termin2);
        setFieldValue("termin_1.value", Math.floor(termin1/100 * values.total));
        setFieldValue("termin_2.value", Math.floor(termin2/100 * values.total));

    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    // RENDER
    render() {
        var initialValue = this.props.initialValue?this.props.initialValue:this.state.initialValue;
        console.log(this.props.relatedData.bonusData);
        var bonusDataKeys = Object.keys(this.state.initialValue?this.state.initialValue.bonus:[]);
        return (
            <div className={"transaction-form"}>
                <Formik initialValues={initialValue}
                        validate={this.fieldValidation}
                        onSubmit={this.submitForm}
                        render={({values, errors, status, touched, isSubmitting, setFieldValue, form}) =>
                        {

                            return (
                                <Form action={this.state.urlLogin} method="post">
                                    <input type="hidden" name="_token" value={csrf_token}/>
                                    <div>
                                        <div className="col-sm-12 col-md-offset-6 col-md-6 calculation-result">
                                            <FormCol1Layout
                                                field1={this.basicLayout("input_commission","Komisi Akhir", errors, touched,
                                                    <FieldNumber name={"input_commission"} placeholder={"komisi"} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                            />
                                        </div>

                                        {/*=================== PELISTING ================= */}
                                        {this.state.initialValue.lister &&
                                        <span>
                                            <div className="col-md-12">
                                                <label className="banner">Pelisting</label>
                                                <div className={"box transaction-box"}>
                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("lister_percent","Listing", errors, touched,
                                                            <FieldPercent name={"lister_percent"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("lister_value","Rp", errors, touched,
                                                            <FieldNumber name={"lister_value"} placeholder={"0 RUpiah"} disabled={true}/>)}
                                                    />
                                                    <hr />

                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("koor.1.percent","Koordinator (1)", errors, touched,
                                                            <FieldPercent name={"koor.1.percent"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("koor.1.value","Rp", errors, touched,
                                                            <FieldNumber name={"koor.1.value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("koor.2.percent","Koordinator (2)", errors, touched,
                                                            <FieldPercent name={"koor.2.percent"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("koor.2.value","Rp", errors, touched,
                                                            <FieldNumber name={"koor.2.value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-offset-6 col-md-6 calculation-result">
                                                <FormCol1Layout
                                                    field1={this.basicLayout("input_commission_wo_coor","Komisi Tanpa Koordinator", errors, touched,
                                                        <FieldNumber name={"input_commission_wo_coor"} placeholder={"komisi"} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                                />
                                            </div>
                                        </span>
                                        }

                                        {/* ================== AGENT ==================== */}
                                        <div className="col-md-12">
                                            <label className="banner">Agent</label>
                                            <div className={"box transaction-box"}>

                                                <div className="col-md-6">
                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("agent_percent_commission","Komisi", errors, touched,
                                                            <FieldPercent name={"agent_percent_commission"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("commission_value","Rp", errors, touched,
                                                            <FieldNumber name={"commission_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <div className="col-md-offset-1 col-md-11 commission-section">
                                                        <FormCol2PPHSection
                                                            field1={this.basicLayoutPercentField("commission_1","<300M", errors, touched,
                                                                <FieldPercent name={"commission_1"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                            field2={this.basicLayoutRupiah("commission_1_value","Rp", errors, touched,
                                                                <FieldNumber name={"commission_1_value"} placeholder={"0"} disabled={true}/>)}
                                                        />

                                                        <FormCol2PPHSection
                                                            field1={this.basicLayoutPercentField("commission_2","<600M", errors, touched,
                                                                <FieldPercent name={"commission_2"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                            field2={this.basicLayoutRupiah("commission_2_value","Rp", errors, touched,
                                                                <FieldNumber name={"commission_2_value"} placeholder={"0"} disabled={true}/>)}
                                                        />

                                                        <FormCol2PPHSection
                                                            field1={this.basicLayoutPercentField("commission_3","<900M", errors, touched,
                                                                <FieldPercent name={"commission_3"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                            field2={this.basicLayoutRupiah("commission_3_value","Rp", errors, touched,
                                                                <FieldNumber name={"commission_3_value"} placeholder={"0"} disabled={true}/>)}
                                                        />

                                                        <FormCol2PPHSection
                                                            field1={this.basicLayoutPercentField("commission_4","> 1.200M", errors, touched,
                                                                <FieldPercent name={"commission_4"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                            field2={this.basicLayoutRupiah("commission_4_value","Rp", errors, touched,
                                                                <FieldNumber name={"commission_4_value"} placeholder={"0"} disabled={true}/>)}
                                                        />
                                                    </div>

                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("subsd","Subsd+", errors, touched,
                                                            <FieldPercent name={"subsd"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                                        field2={this.basicLayoutRupiah("subsd_value","Rp", errors, touched,
                                                            <FieldNumber name={"subsd_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    {/*<FormCol2Layout2*/}
                                                        {/*field1={this.basicLayoutPercentField("agent_x","X", errors, touched,*/}
                                                            {/*<FieldPercent name={"agent_x"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}*/}
                                                        {/*field2={this.basicLayoutRupiah("agent_x_value","Rp", errors, touched,*/}
                                                            {/*<FieldNumber name={"agent_x_value"} placeholder={"0"} disabled={true}/>)}*/}
                                                    {/*/>*/}

                                                    <LinePlus/>
                                                    <span className={"calculation-result"}>
                                            <FormCol1Layout
                                                field1={this.basicLayoutRupiah("total_commission","Rp", errors, touched,
                                                    <FieldNumber name={"total_commission"} placeholder="0" disabled={true} /> )}
                                            />
                                        </span>

                                        <span className={"total-pph-section"}>
                                            <FormCol1Layout
                                                field1={this.basicLayoutRupiah("total_pph","PPh Rp", errors, touched,
                                                    <FieldNumber name={"total_pph"} placeholder="0" disabled={true} /> )}
                                            />
                                            <FormCol1Layout
                                                field1={this.basicLayout("biaya_lain_3","Biaya lain-lain (-)", errors, touched,
                                                    <FieldNumber name={"biaya_lain_3"} placeholder={"masukkan biaya lain-lain"} onBlur={()=>this.countKomisi(values, setFieldValue)}/> )}
                                            />
                                        </span>
                                                </div>

                                                <div className="col-md-6 pph-section">
                                                    <FormCol2PPHSection
                                                        field1={this.basicLayoutPercentField("pph_1","PPH <= 50x", errors, touched,
                                                            <FieldPercent name={"pph_1"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("pph_1_value","Rp", errors, touched,
                                                            <FieldNumber name={"pph_1_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <FormCol2PPHSection
                                                        field1={this.basicLayoutPercentField("pph_2","50 - <= 250x", errors, touched,
                                                            <FieldPercent name={"pph_2"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("pph_2_value","Rp", errors, touched,
                                                            <FieldNumber name={"pph_2_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <FormCol2PPHSection
                                                        field1={this.basicLayoutPercentField("pph_3","250 - <= 500x", errors, touched,
                                                            <FieldPercent name={"pph_3"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("pph_3_value","Rp", errors, touched,
                                                            <FieldNumber name={"pph_3_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <FormCol2PPHSection
                                                        field1={this.basicLayoutPercentField("pph_4","> 500x", errors, touched,
                                                            <FieldPercent name={"pph_4"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                        field2={this.basicLayoutRupiah("pph_4_value","Rp", errors, touched,
                                                            <FieldNumber name={"pph_4_value"} placeholder={"0"} disabled={true}/>)}
                                                    />

                                                    <LinePlus/>
                                                    <span className={"calculation-result"}>
                                                        <FormCol1Layout
                                                            field1={this.basicLayoutRupiah("total_pph","Rp", errors, touched,
                                                                <FieldNumber name={"total_pph"} placeholder="0" disabled={true} style={{float:"right"}} /> )}
                                                        />
                                                    </span>
                                                    <span className={"prev_komisi_section"}>
                                                        <b>
                                                            Total Komisi Agent Tahun Ini : 50.000.000 <br/>
                                                            Total PPH Dibayar Agent Tahun Ini : 5.000.000
                                                        </b>
                                                    </span>

                                                </div>

                                                <div className="col-xs-12 comission-result calculation-result">
                                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                                        <LinePlus/>
                                                        <FormCol1Layout
                                                            field1={this.basicLayoutRupiah("total","Total Rp", errors, touched,
                                                                <FieldNumber name={"total"} placeholder="0" disabled={true} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ================== OFFICE ==================== */}
                                        <div className="col-md-12">
                                            <label className="banner">Office</label>
                                            <div className={"box transaction-box"}>
                                                <div className="col-md-12">
                                                    <div className="col-md-6">

                                                        <FormCol2Layout2
                                                            field1={this.basicLayoutPercentField("office_percent_commission","Office", errors, touched,
                                                                <FieldPercent name={"office_percent_commission"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true} /> )}
                                                            field2={this.basicLayoutRupiah("office_value","Rp", errors, touched,
                                                                <FieldNumber name={"office_value"} placeholder={"0"} disabled={true}/>)}
                                                        />

                                                        <FormCol2Layout2
                                                            field1={this.basicLayoutPercentField("ppn","PPN", errors, touched,
                                                                <FieldPercent name={"ppn"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                                            field2={this.basicLayoutRupiah("ppn_value","Rp", errors, touched,
                                                                <FieldNumber name={"ppn_value"} placeholder={"0"} disabled={true}/>)}
                                                        />

                                                        <FormCol2Layout2
                                                            field1={this.basicLayoutPercentField("office_subsd","Subsd-", errors, touched,
                                                                <FieldPercent name={"office_subsd"} placeholder="0%" onBlur={()=>this.countKomisi(values, setFieldValue)} disabled={true}/> )}
                                                            field2={this.basicLayoutRupiah("office_subsd_value","Rp", errors, touched,
                                                                <FieldNumber name={"office_subsd_value"} placeholder={"0"} disabled={true}/>)}
                                                        />
                                                    </div>
                                                </div>
                                                <hr/>

                                                {/*BONUS*/}

                                                <div className="col-xs-12 col-sm-12 col-lg-9" style={{padding:"40px auto"}}>
                                                    {bonusDataKeys && bonusDataKeys.map(bonusKey=> {
                                                        var bonus = this.state.initialValue.bonus[bonusKey];
                                                        return (<FormCol4BonusSection key={bonusKey+"_insert_section"}
                                                            field1={this.basicLayoutRupiah("bonus."+bonusKey+".name", bonus.label, errors, touched,
                                                                <FieldText name={"bonus."+bonusKey+".name"} placeholder={bonus.label} disabled={true}/> )}
                                                            field2={<FieldPercent name={"bonus."+bonusKey+".percent"} placeholder={"0%"} disabled={true}/>}
                                                            field3={this.basicLayoutRupiah("bonus."+bonusKey+".value", "Rp", errors, touched,
                                                                <FieldNumber name={"bonus."+bonusKey+".value"} placeholder="0" disabled={true}/> )}
                                                        />);
                                                    })}
                                                </div>
                                                <hr/>

                                                <div className="col-xs-12 comission-result calculation-result">
                                                    <div className="col-xs-12 col-sm-12 col-md-6">
                                                        <LinePlus/>
                                                        <FormCol1Layout
                                                            field1={this.basicLayoutRupiah("total_office","Total Rp", errors, touched,
                                                                <FieldNumber name={"total_office"} placeholder="0" disabled={true} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                                        />
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                        {/* ================== TERMIN ==================== */}
                                        <div className="col-md-12">
                                            <div className="box transaction-box">
                                                <div className="col-md-6">
                                                    <FieldRadio name={"langsungCair"}
                                                                customClass={"col-xs-12"}
                                                                options={[
                                                                    {id:1, label:"Cair Langsung"},
                                                                    {id:0, label:"Cair Tidak Langsung"}
                                                                ]} />

                                                </div>

                                                <div className="col-md-12">
                                                    {values.langsungCair == 0 &&
                                                        <span>

                                                            <FormCol4BonusSection key={"termin_1"}
                                                                                  field1={this.basicLayoutRupiah("termin_1.date", "termin 1", errors, touched,
                                                                                      <FieldDateWithDatePicker name={"termin_1.date"} placeholder={"dd/mm/yyyy"}/> )}
                                                                                  field2={<FieldPercent name={"termin_1.percent"} placeholder={"0%"}/>}
                                                                                  field3={this.basicLayoutRupiah("termin_1.value", "Rp", errors, touched,
                                                                                      <FieldNumber name={"termin_1.value"} placeholder="0" disabled={true}/> )}
                                                            />
                                                            <FormCol4BonusSection key={"termin_2"}
                                                                                  field1={this.basicLayoutRupiah("termin_2.date", "termin 2", errors, touched,
                                                                                      <FieldDateWithDatePicker name={"termin_2.date"} placeholder={"dd/mm/yyyy"}/> )}
                                                                                  field2={<FieldPercent name={"termin_2.percent"} placeholder={"0%"}/>}
                                                                                  field3={this.basicLayoutRupiah("termin_2.value", "Rp", errors, touched,
                                                                                      <FieldNumber name={"termin_2.value"} placeholder="0" disabled={true}/> )}
                                                            />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <input type="submit" value="NEXT" className="btn float-right login_btn btn-primary form-control"/>
                                    <input type="button" value="prev" onClick={this.props.backPrevForm} className="btn float-right login_btn btn-primary form-control"/>

                                    <div className={"row"}>
                                        <div style={{display:'block'}} className={'col-xs-12'}>
                                            <label>Error:</label><br/>
                                            <code>{errors?JSON.stringify(errors):""}</code><br/>
                                            <label>Touched:</label><br/>
                                            <code>{touched?JSON.stringify(touched):""}</code><br/>
                                            <label>Value:</label><br/>
                                            <code>{values?JSON.stringify(values):""}</code>
                                            <code>{values?JSON.stringify(values.bonus):""}</code>
                                            <br/>
                                        </div>
                                    </div>

                                </Form>

                            )}}
                />
            </div>
        )
    }
}