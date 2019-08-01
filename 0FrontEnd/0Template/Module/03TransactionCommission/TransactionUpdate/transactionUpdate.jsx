import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import TransactionCreate from "./../TransactionCreate/transactionCreate.jsx";

export default class TransactionUpdate extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var submitAjaxCall = "/"+baseUrl+"/updateTransaction";

        this.callInitialData(ajaxCall, dataId);

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,
            submitAjaxCall:submitAjaxCall,
            theId : 0,
            agent_id_label: "",
            initialValue:{
                // property_value: "100.000.000",
                // property_note: "abc",
                // percent_commission: "5"
            },
            // form1:{property_value: "100.000.000"}
        };
    }

    // Call Initial Data
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
                agent_id_label: response.data.agent_id_label,
                theId: dataId
            });
        });

    }

    // RENDER
    render() {
        return (
            <React.Fragment>
            {this.state.initialValue && <TransactionCreate initialValue={this.state.initialValue} isEdit={true} submitAjaxCall={this.state.submitAjaxCall} theId={this.state.theId} agent_id_label={this.state.agent_id_label}/> }
            </React.Fragment>
        )
    }
}