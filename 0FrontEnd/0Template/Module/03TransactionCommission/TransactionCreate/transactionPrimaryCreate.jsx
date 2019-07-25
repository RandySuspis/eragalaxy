import React, { Component } from "react";
import "./index.scss"
import TransactionPrimaryCreate1 from "./transactionPrimaryCreate1.jsx";
import TransactionPrimaryCreate2 from "./transactionPrimaryCreate2.jsx";
import TransactionCreate3 from "./transactionCreate3.jsx";

import request from "../../../Shared/RequestWrapper.jsx";


export default class TransactionCreate extends React.Component{

    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            whichForm : 1
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
                propertyId:this.state.form1.property_id,
                currentCommission:this.state.form1.last_commission,
                propertyValue:this.state.form1.property_value,
                percentCommission:this.state.form1.percent_commission
            }
        }).then(response => {
            console.log(response);
            if (response.status === 200 && response.statusText === "OK"){
                this.setState({
                    agentData: response.data.commissionData,
                    bonusData : response.data.bonusData,
                    lister: response.data.lister,
                    coor: response.data.coor,
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
        if (this.state.whichForm === 1){
            if (this.state.mgfee){
                return (<TransactionPrimaryCreate1 onSubmit={this.changeStateForm} formData={this.state.form1} relatedData={this.state}/>)
            }
        }else if (this.state.whichForm === 2){
            if (this.state.agentData) {
                return (<TransactionPrimaryCreate2 onSubmit={this.changeStateForm}
                                                   lastCommission={this.state.form1 ? this.state.form1.last_commission : 0}
                                                   backPrevForm={this.backForm}
                                                   relatedData={this.state}/>)
            }
        }else if (this.state.whichForm === 3){
            return (<TransactionCreate3 onSubmit={this.submitAllData} form1={this.state.form1} form2={this.state.form2}  backPrevForm={this.backForm} responseMessage={this.state.responseMessage}/>)
        }
        return "loading";

    }

}