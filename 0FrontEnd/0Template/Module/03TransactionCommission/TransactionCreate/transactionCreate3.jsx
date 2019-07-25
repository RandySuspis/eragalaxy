import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldText, FieldPercent, FieldNumber, FieldDateWithDatePicker} from "../../../Components/03Form/FieldType.jsx";
import request from "../../../Shared/RequestWrapper.jsx";
import {
    FormCol1Layout,
    FormCol2Layout,
    FormCol2Layout2,
    FormCol2PPHSection,
    FormCol4BonusSection,
    LinePlus
} from "./sharedColumnForm.jsx"
import DefaultBaseModal from "../../../Components/00Default/03Popup/00defaultBaseModal.jsx";


class ModelSuccessOrError extends React.Component{
    render(){
        return (
            <div className="col-xs-12" style={{textAlign:'center'}}>
                <div className="col-xs-12">
                    <h1>{this.props.textTitle}</h1>
                </div>
                <div className="col-xs-12">
                    <span className='btn btn-primary' onClick={this.props.closeModal}> Okay </span>
                </div>
            </div>
        )
    }
}


const CardCoorBonusDetail = function(props){
    return <div className={"col-sm-12 col-md-6 coor-detail-card"}>
        <div>
            <label name="bm_name" className={"col-xs-12"}>{props.name}</label>

            <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
                <span className={"col-md-5"}>
                    <span className={'col-sm-12 col-lg-5 labelSection'}>
                        <b>{props.label?props.label:"No Name"}</b>
                    </span>
                    <span className={'col-sm-12 col-lg-7 contentSection'}>
                        {props.percent}%
                    </span>
                </span>
                <span className={"col-md-7"}>
                    <span className={'col-sm-12 col-lg-2 labelSection'}>
                        {props.value}
                    </span>
                </span>
                {/*<span className={"col-md-12"}>*/}
                    {/*<span className={'col-sm-12 col-lg-2 labelSection'}>*/}
                        {/*<b>PPN</b>*/}
                        {/*</span>*/}
                    {/*<span className={'col-sm-12 col-lg-10 contentSection'}>*/}
                        {/*-*/}
                    {/*</span>*/}
                {/*</span>*/}
            </span>
        </div>
    </div>
}


export default class TransactionCreate3 extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        console.log("gila a");

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,

            initialValue: {
                project_name: "",
                agent_lister_id: "",
                note: "",
                pph_1: "20",
                pph_2: "15",
                pph_3: "10",
                pph_4: "5",
                agent:[],
                responseMessage: null
            }

        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            responseMessage: nextProps.responseMessage
        })
    }

    componentWillMount() {
        var createAjaxCall = "/"+baseUrl+"/create/";
        var submitAjaxCall = this.props.submitAjaxCall?this.props.submitAjaxCall:createAjaxCall;
        this.setState({submitAjaxCall:submitAjaxCall,})
    }

    // FORM RELATED
    fieldValidation = (values) => {
        let errors = {};
        return errors;
    }

    numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
            return "0"
        }
    }

    basicLayoutGeneralInfo = (keyname, label, touched, content) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'}>
                {content}
            </span>
        </React.Fragment>)
    }

    basicLayoutRupiah = (keyname, label, field) => {
        return (<React.Fragment>
            <span className={'col-xs-1 col-lg-2 labelSection'} style={{width:"10%", paddingRight:"10px", paddingLeft:"10px"}}>
                <b>{label}</b>
                </span>
            <span className={'col-xs-11 col-lg-10 inputSection'} style={{width:"90%", textAlign:"right"}}>
                {field}
            </span>
        </React.Fragment>)
    }

    basicLayoutPercentField = (keyname, label, field) => {
        return (<React.Fragment>
            <span className={'col-xs-5 col-sm-5 col-lg-5 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-xs-7 col-sm-7 col-lg-7 inputSection'}>
                {field}
            </span>
        </React.Fragment>)
    }

    basicLayout = (keyname, label, touched, content) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'}>
                {content}
            </span>
        </React.Fragment>)
    }

    basicLayout2 = (keyname, label, touched, content) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-lg-5 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-sm-12 col-lg-7 contentSection'}>
                {content}
            </span>
        </React.Fragment>)
    }

    basicLayout3 = (keyname, label, content) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-lg-2 labelSection'}>
                <b>{label}</b>
                </span>
            <span className={'col-sm-12 col-lg-10 contentSection'}>
                {content}
            </span>
        </React.Fragment>)
    }

    basicLayout4 = (keyname, touched, content) => {
        return (<React.Fragment>
            <span className={'col-sm-12 col-lg-12 inputSection'}>
                <b>{content}</b>
            </span>
        </React.Fragment>)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    toggleModal(){
        if (this.state.responseMessage == "Success"){
            window.location.replace("/transaction/")
        }else{
            this.setState({
                responseMessage: null
            })
        }

    }

    // RENDER
    render() {
        console.log(this.props.form1);
        console.log(this.props.form2);
        var initialValue = this.props.form2;
        var bonusDataKeys = Object.keys(this.props.form2.bonus? this.props.form2.bonus:[]);

        var str = (this.props.form1.start_commission+"").replace(/\./g, "");
        var mgfee = parseInt(str) * (parseFloat(this.props.form1.mg_fee_percent)/100);
        initialValue['mg_fee'] = Math.floor(mgfee)

        return (
            <div className={"transaction-form"}>
                <Formik initialValues={initialValue}
                    validate={this.fieldValidation}
                    onSubmit={this.props.onSubmit}
                    render={({values, errors, status, touched, isSubmitting, setFieldValue, form}) => (
                        <Form action={this.state.urlLogin} method="post">
                            <input type="hidden" name="_token" value={csrf_token}/>
                            <div>
                                <div className="col-md-12 box transaction-box">
                                    <div className="col-md-6">
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("date","Tanggal", touched,
                                                this.props.form1.date )}
                                        />
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("nama_ma","Nama MA", touched,
                                                this.props.form1.agent_id_label )}
                                        />
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("nama_property","Nama Property", touched,
                                                this.props.form1.property_id_label )}
                                        />
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("property_value","Property Value", touched,
                                                "Rp. "+ this.numberWithCommas(this.props.form1.property_value) )}
                                        />
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("komisi","Komisi", touched,
                                                this.props.form1.percent_commission )}
                                        />
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("komisi_awal","Komisi Awal", touched,
                                                "Rp. " + this.numberWithCommas(this.props.form2.input_commission) )}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormCol1Layout
                                            field1={this.basicLayoutGeneralInfo("nomor_transaksi","Nomor Transaksi", touched,
                                                "____ ____/______" )}
                                        />
                                        <div className="col-xs-12 comission-result calculation-result">
                                            <FormCol1Layout
                                                field1={this.basicLayoutGeneralInfo("mg_fee","MG FEE", touched,
                                                    <FieldNumber name={"mg_fee"} placeholder="0" disabled={true} /> )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <label className="banner" style={{display:"none"}}>Koordinator Bonus</label>
                                <div className="col-md-12 box transaction-box" style={{display:"none"}}>
                                    <FormCol2Layout
                                        field1={this.basicLayout("listing","Listing", touched,
                                            "0%" )}
                                    />
                                    <FormCol2Layout
                                        field1={this.basicLayout("listing_value","Rp", touched,
                                            "0" )}
                                    />
                                    <div className="col-md-6">
                                        <FormCol2Layout
                                            field1={this.basicLayout("koor_1","Koordinator 1", touched,
                                                "0%" )}
                                            field2={this.basicLayout("koor_2","Koordinator 2", touched,
                                                "0%" )}
                                        />
                                        <FormCol2Layout
                                            field1={this.basicLayout("koor_1_value","Rp", touched,
                                                "0" )}
                                            field2={this.basicLayout("koor_2_value","Rp", touched,
                                                "0" )}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormCol2Layout
                                            field1={this.basicLayout("koor_3","Koordinator 3", touched,
                                                "0%" )}
                                            field2={this.basicLayout("koor_4","Koordinator 4", touched,
                                                "0%" )}
                                        />
                                        <FormCol2Layout
                                            field1={this.basicLayout("koor_3_value","Rp", touched,
                                                "0" )}
                                            field2={this.basicLayout("koor_4_value","Rp", touched,
                                                "0" )}
                                        />
                                    </div>
                                </div>

                                {this.props.form2.lister_percent &&
                                    <span>
                                        <label className="banner">Coordinator Bonus</label>
                                        <div className="col-md-12 box transaction-box">
                                            <div className="col-md-6">

                                                <FormCol2Layout2
                                                    field1={this.basicLayoutPercentField("lister_percent","Listing", this.props.form2.lister_percent )}
                                                    field2={this.basicLayoutRupiah("lister_value","Rp", this.numberWithCommas(this.props.form2.lister_value) )}
                                                />
                                                {this.props.form2.koor[1] &&
                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("koor.1.percent", "Koor 1", this.props.form2.koor[1].percent)}
                                                        field2={this.basicLayoutRupiah("koor.1.value", "Rp", this.numberWithCommas(this.props.form2.koor[1].value))}
                                                    />
                                                }
                                                {this.props.form2.koor[2] &&
                                                    <FormCol2Layout2
                                                        field1={this.basicLayoutPercentField("koor.2.percent", "Koor 2", this.props.form2.koor[2].percent)}
                                                        field2={this.basicLayoutRupiah("koor.2.value", "Rp", this.props.form2.koor[2].value)}
                                                    />
                                                }

                                                <LinePlus/>

                                                <FormCol1Layout
                                                    field1={this.basicLayoutRupiah("total_commission","Rp", this.numberWithCommas(this.props.form2.input_commission - this.props.form2.input_commission_wo_coor) )}
                                                />

                                            </div>
                                        </div>
                                    </span>
                                }

                                <label className="banner">Agent</label>
                                <div className="col-md-12 box transaction-box">
                                    <div className="col-md-6">

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("commission","Komisi", this.props.form2.agent_percent_commission )}
                                            field2={this.basicLayoutRupiah("commission_value","Rp", this.numberWithCommas(this.props.form2.commission_value) )}
                                        />

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("subsd","Subsd+", this.props.form2.subsd )}
                                            field2={this.basicLayoutRupiah("subsd_value","Rp", this.numberWithCommas(this.props.form2.subsd_value) )}
                                        />

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("agent_x","X", "0%" )}
                                            field2={this.basicLayoutRupiah("agent_x_value","Rp", "0" )}
                                        />

                                        <LinePlus/>

                                        <FormCol1Layout
                                            field1={this.basicLayoutRupiah("total_commission","Rp", this.numberWithCommas(this.props.form2.total_commission) )}
                                        />

                                        <FormCol1Layout
                                            field1={this.basicLayoutRupiah("total_pph","PPh Rp", this.numberWithCommas(this.props.form2.total_pph) )}
                                        />

                                    </div>
                                    <div className="col-md-6 pph-section">
                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("pph_1","PPH <= 50x",
                                                this.props.form2.pph_1 )}
                                            field2={this.basicLayoutRupiah("pph_1_value","Rp", this.numberWithCommas(this.props.form2.pph_1_value) )}
                                        />

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("pph_2","50 - <= 250x",
                                                this.props.form2.pph_2 )}
                                            field2={this.basicLayoutRupiah("pph_2_value","Rp", this.numberWithCommas(this.props.form2.pph_2_value) )}
                                        />

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("pph_3","250 - <= 500x",
                                                this.props.form2.pph_3 )}
                                            field2={this.basicLayoutRupiah("pph_3_value","Rp", this.numberWithCommas(this.props.form2.pph_3_value) )}
                                        />

                                        <FormCol2Layout2
                                            field1={this.basicLayoutPercentField("pph_4","> 500x",
                                                this.props.form2.pph_4 )}
                                            field2={this.basicLayoutRupiah("pph_4_value","Rp", this.numberWithCommas(this.props.form2.pph_4_value) )}
                                        />

                                        <LinePlus/>

                                        <FormCol1Layout
                                            field1={this.basicLayoutRupiah("total_pph","Rp",
                                                this.numberWithCommas(this.props.form2.total_pph) )}
                                        />
                                    </div>

                                    <div className="col-xs-12 comission-result calculation-result">
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <LinePlus/>
                                            <FormCol1Layout
                                                field1={this.basicLayoutRupiah("total","Total Rp",
                                                    <FieldNumber name={"total"} placeholder="0" disabled={true} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <label className="banner">Office</label>
                                <div className="col-md-12 box transaction-box">
                                    <div className="col-md-12">
                                        <div className="col-md-6" style={{paddingBottom:"20px"}}>

                                            <FormCol2Layout2
                                                field1={this.basicLayout2("office","Office", touched,
                                                    this.props.form2.office_percent_commission )}
                                                field2={this.basicLayoutRupiah("office_value","Rp",
                                                    this.numberWithCommas(this.props.form2.office_value) )}
                                            />

                                            <FormCol2Layout2
                                                field1={this.basicLayout2("ppn","PPN", touched,
                                                    this.props.form2.ppn )}
                                                field2={this.basicLayoutRupiah("ppn_value","Rp",
                                                    this.numberWithCommas(this.props.form2.ppn_value) )}
                                            />

                                            <FormCol2Layout2
                                                field1={this.basicLayout2("subsd","Subsd-", touched,
                                                    (this.props.form2.subsd?this.props.form2.subsd:"0%") )}
                                                field2={this.basicLayoutRupiah("subsd_value","Rp",
                                                    this.numberWithCommas(this.props.form2.subsd_value?this.props.form2.subsd_value:"0") )}
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="col-md-12">
                                        {bonusDataKeys.map((bonusKey)=>{
                                            var bonus = this.props.form2.bonus[bonusKey];
                                            return(
                                                <CardCoorBonusDetail name={bonus.name} percent={bonus.percent} value ={this.numberWithCommas(bonus.value)} label={bonusKey}/>
                                            )
                                        })}

                                    </div>
                                    <div className="col-xs-12 comission-result calculation-result">
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <LinePlus/>
                                            <FormCol1Layout
                                                field1={this.basicLayoutRupiah("total_office","Total Rp",
                                                    <FieldNumber name={"total_office"} placeholder="0" disabled={true} onBlur={()=>this.countKomisi(values, setFieldValue)} /> )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ================== TERMIN ==================== */}
                            <div className="col-md-12" style={{padding:"0px 0px"}}>
                                <div className="box transaction-box">
                                    <div className="col-md-12">
                                        <FormCol2Layout
                                            field1={this.basicLayout4("", touched,
                                                this.props.form2.langsungCair == 0 ? "Cair tidak langsung":"Cair Langsung")}
                                        />
                                    </div>
                                    {this.props.form2.langsungCair == 0 && <div className="col-md-12">
                                        {this.props.form2.termin_1.date} - {this.props.form2.termin_1.percent} - {this.props.form2.termin_1.value}
                                        {this.props.form2.termin_2.date} - {this.props.form2.termin_2.percent} - {this.props.form2.termin_2.value}
                                    </div>
                                    }

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
                                    <code>{values?JSON.stringify(values):""}</code><br/>
                                </div>
                            </div>

                        </Form>

                    )}
            />
                <DefaultBaseModal
                    isOpen={this.state.responseMessage?true:false} closeModal={this.toggleModal.bind(this)}
                    content={<ModelSuccessOrError textTitle={this.props.responseMessage} closeModal={this.toggleModal.bind(this)}/>}
                />
            </div>
        )
    }
}