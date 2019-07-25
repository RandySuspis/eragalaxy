import React, { Component } from "react";
import "./index.scss"
import {ErrorMessage, Form, Formik} from "formik";
import {FieldAsyncSelect, FieldTextArea, FieldText, FieldNumber} from "../../../Components/03Form/FieldType.jsx";
import request from "../../../Shared/RequestWrapper.jsx";

export default class PrimaryPropertyReport extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            baseUrl: "/api/primary/view/1",
            ajaxCall:ajaxCall,
            componentStatus:'ready',
            primary_project_id:1,
            primaryData: [],
            coorData: [],

            initialValue: {
                project_name: "",
                agent_lister_id: "",
                note: "",
                agent:[]
            }

        };
        this.loadData();
    }

    loadData = () => {
        if (this.state.componentStatus != 'loading') {
            if (this.state.componentStatus != 'done') {
                this.setState({
                    componentStatus: 'loading'
                });
                request({
                    url:    this.state.baseUrl,
                    method: 'GET',
                }).then(response => {
                    this.setState({
                        componentStatus: 'ready',
                        primaryData: response.data.data.data,
                        coorData: response.data.data.coordinators
                    });
                })
            }
        }
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

    // RENDER
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        Nama Project
                    </div>
                    <div className="col-md-6">
                        {this.state.primaryData.project_name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        Note
                    </div>
                    <div className="col-md-6">
                        {this.state.primaryData.note}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        Pelisting
                    </div>
                    <div className="col-md-6">
                        {this.state.primaryData.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        Komisi Pelisting
                    </div>
                    <div className="col-md-6">
                        {this.state.primaryData.percent_listing_commission} %
                    </div>
                </div>

                {this.state.coorData &&

                    this.state.coorData.map((data, index) => (
                        <div>
                            <h3>Koordinator {index+1}</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    Nama
                                </div>
                                <div className="col-md-6">
                                    {data.agent_name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    Komisi
                                </div>
                                <div className="col-md-6">
                                    {data.percent_commission} %
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}