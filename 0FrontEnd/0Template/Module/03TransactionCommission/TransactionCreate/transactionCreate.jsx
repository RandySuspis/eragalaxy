import React, { Component } from "react";
import "./index.scss"
import TransactionCreate1 from "./transactionCreate1.jsx";
import TransactionCreate2 from "./transactionPrimaryCreate2.jsx";
import TransactionCreate3 from "./transactionCreate3.jsx";
import TransactionSuccess from "./transactionCreate3.jsx";
// import TransactionPrimaryCreate2 from "./transactionPrimaryCreate2.jsx";
import request from "../../../Shared/RequestWrapper.jsx";
import galaxyHelper from "../../../Shared/GalaxyHelper.jsx";


export default class TransactionCreate extends React.Component{

    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            whichForm : 1,
            componentStatus: true,
            isEdit: false,
            form1: [],
            form2: []
        };
    }

    callInitialData(){
        // CALLING TRANSACTION NECESSARY DATA
        // 1. Tax Data
        // 2. Mg Fee

        request({
            url: "/agent/getTransactionRelatedData",
            method: 'get',
            params: {}
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                this.setState({
                    taxData: response.data.taxData,
                    mgfee : response.data.mgfee
                })
            }else{

            }
        })
    }

    callAgentRelatedData(){
        // CALLING TRANSACTION NECESSARY DATA
        // 1. Agent Commission
        // 2. BM, BD, MD, MGM1, MGM2
        request({
            url: "/agent/getTransactionAgentRelatedData",
            method: 'get',
            params: {
                propertyAgentData:this.state.form1.agent_id,
                currentCommission:this.state.form1.last_commission,
                propertyValue:this.state.form1.property_value,
                percentCommission:this.state.form1.percent_commission

            }
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                this.setState({
                    agentData: response.data.commissionData,
                    bonusData : response.data.bonusData
                })
            }else{

            }

        })
    }

    componentDidMount() {
        this.callInitialData();
    }

    changeStateForm = (stateForm, formValues) => {
        if (stateForm == 2){
            this.setState({
                whichForm:stateForm,
                form1:formValues
            })
            this.callAgentRelatedData();
        }else if (stateForm == 3){
            this.setState({
                whichForm:stateForm,
                form2:formValues
            })
        }
    }

    backForm = () =>{
        if (this.state.whichForm == 2){
            this.setState({
                whichForm:1,
            })
            this.callAgentRelatedData();
        }else if (this.state.whichForm == 3){
            this.setState({
                whichForm:2,
            })
        }
    }

    submitAllData=()=>{
        request({
            url: "/transaction/saveTransaction",
            method: 'post',
            params:   {
                form1 : this.state.form1,
                form2 : this.state.form2,
            }
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                // window.location.href = "/"+this.state.baseUrl;
                this.setState({responseMessage:"Success"});
            }else{
                this.setState({responseMessage:"Error"});
            }
        })
    }

    render(){
        var data = this.props.initialValue?this.props.initialValue:{};
        if(this.props.isEdit && !this.state.isEdit) {
            this.state.isEdit=true
            this.setState({
                isEdit: true
            })
        }

        if(data.hasOwnProperty('id') && this.state.componentStatus && this.state.isEdit) {
            console.log(data)
            var form1 = {
                date: galaxyHelper.dateToDMY(new Date(data.transaction_date)),
                agent_id: data.agent_id,
                agent_id_label: data.agent_id_label,
                property_id: data.property_id,
                property_note_name: data.property_note_name,
                property_note: data.property_note,
                property_id_label: data.property_id_label,
                property_value: data.property_value,
                percent_commission: data.property_percent,
                biaya_lain_1: data.biaya_lain_1,
                biaya_lain_2: data.biaya_lain_2,
                transaction_number: data.invoice_id
            }
            var form2 = {
                biaya_lain_3: data.biaya_lain_3,
                subsd: data.office_subsidy_percent,
            }
            this.setState({
                form1: form1,
                form2: form2,
                componentStatus: false
            })
        }

        if (this.state.whichForm === 1){
            if (this.state.mgfee){
                return (<TransactionCreate1 onSubmit={this.changeStateForm} formData={this.state.form1} relatedData={this.state} />)
            }
        }else if (this.state.whichForm === 2){
            if (this.state.agentData) {
                return (<TransactionCreate2 onSubmit={this.changeStateForm}
                                            lastCommission={this.state.form1 ? this.state.form1.last_commission : 0}
                                            formData={this.state.form2}
                                            backPrevForm={this.backForm}
                                            relatedData={this.state}/>)
            }
        }else if (this.state.whichForm === 3){
            return (<TransactionCreate3 onSubmit={this.submitAllData} form1={this.state.form1} form2={this.state.form2}  backPrevForm={this.backForm} responseMessage={this.state.responseMessage}/>)
        }
        return "loading";

    }

}