import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import TransactionCreate from "./../TransactionCreate/transactionCreate.jsx";

export default class PrimaryPropertyUpdate extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var submitAjaxCall = "/"+baseUrl+"/update/"+dataId;

        this.callInitialData(ajaxCall, dataId);

        this.state = {
            baseUrl: window.baseUrl,
            ajaxCall:ajaxCall,
            submitAjaxCall:submitAjaxCall
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
            {this.state.initialValue && <TransactionCreate initialValue={this.state.initialValue} isEdit={true} submitAjaxCall={this.state.submitAjaxCall}/> }
            </React.Fragment>
        )
    }
}