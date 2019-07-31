import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import TransactionPrimaryCreate from "./../TransactionCreate/transactionPrimaryCreate.jsx";

export default class TransactionPrimaryUpdate extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var submitAjaxCall = "/"+baseUrl+"/update/"+dataId;

        this.callInitialData(ajaxCall, dataId);

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,
            submitAjaxCall:submitAjaxCall,
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
            });
        });

    }

    // RENDER
    render() {
        return (
            <React.Fragment>
            {this.state.initialValue && <TransactionPrimaryCreate initialValue={this.state.initialValue} isEdit={true} submitAjaxCall={this.state.submitAjaxCall}/> }
            </React.Fragment>
        )
    }
}