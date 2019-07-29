import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";
import ReactExport from "react-export-excel";
import DatePicker from 'react-datepicker'
import GalaxyHelper from "../../../Shared/GalaxyHelper.jsx";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DefaultHeader = function(props){
    var {columnStructure} = props;
    return (
        <div className={'header'}>

            <div className="row hidden-xs" >
                <div className="col-xs-3" > Date </div>
                <div className="col-xs-3" > Agent Name </div>
                <div className="col-xs-3" > Komisi </div>
                <div className="col-xs-3" > Nilai Transaksi </div>
            </div>
        </div>
    )
}

const DefaultShowData = function(props){

    // var {columnStructure, item, visible} = this.props;
    // var index = 0;
    return(
        <React.Fragment>
            <div className="randyRow">
                <div className="col-xs-3" > {props.item.date} </div>
                <div className="col-xs-3" > {props.item.agent_name} </div>
                <div className="col-xs-3" > {GalaxyHelper.numberWithCommas(props.item.gross_commission)} </div>
                <div className="col-xs-3" > {GalaxyHelper.numberWithCommas(props.item.property_value)} </div>
            </div>
        </React.Fragment>

    )

}

const Download = function (props) {
    return (
        <ExcelFile element={<button>Download Data</button>} filename={"Primary"}>
            <ExcelSheet data={props.props} name="Primary">
                <ExcelColumn label="No" value="index"/>
                <ExcelColumn label="Primary" value="name"/>
                <ExcelColumn label="Total Gross" value="total_gross"/>
                <ExcelColumn label="Total Transaksi" value="transaction_count"/>
                <ExcelColumn label="Total" value="total"/>
            </ExcelSheet>
        </ExcelFile>
    )
}


export default class primaryPropertyReportDetail extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var dateNow = this.formatDate(new Date());
        var dateBefore = this.formatDateBefore(new Date());

        this.state = {
            baseUrl: "/api/primary/report/detail",
            ajaxCall:ajaxCall,
            componentStatus:'ready',
            primary_project_id:primary_project_id,
            primaryData: [],
            data: [],
            startDate: dateBefore,
            endDate: dateNow,

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
                    params:{
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        primary_project_id: this.state.primary_project_id,
                    }
                }).then(response => {
                    this.setState({
                        componentStatus: 'ready',
                        primaryData: response.data.data.data,
                        data: response.data.data.data.transaction,
                    });
                })
            }
        }
    }

    formatDateBefore = (date) => {
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = date.getMonth();
        if (month < 10) {
            month = "0" + month;
        }
        var year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }

    formatDate = (date) => {
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }

    onStartDatePick = (date, event) => {
        var temp = this.formatDate(date)
        this.state.startDate = temp;
        this.setState({startDate:temp})
        console.log(this.state.endDate)
        {this.state.endDate &&
        this.loadData()}
    }

    onEndDatePick = (date, event) => {
        var temp = this.formatDate(date)
        this.state.endDate = temp;
        this.setState({endDate:temp})
        {this.state.startDate &&
        this.loadData()}
    }

    // RENDER
    render() {
        return (
            <div className="primaryPropertyReport">
                {this.state.data &&
                <div style={{float:"right", padding:"10px"}}>
                    <Download props={this.state.data}/>
                </div>}
                <div style={{padding:"10px"}}>
                    <div className={"col-md-6"}>
                        <label className={"col-md-6"}>
                            Project Name
                        </label>
                        <div className={"col-md-6"}>
                            {this.state.primaryData.project_name}
                        </div>
                    </div>
                    <div className={"col-md-12"}>
                        <label className={"col-md-3"}>
                            Date
                        </label>
                        <DatePicker style={{zIndex:"10"}}
                            // selected={date}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="start-date"
                                    className="form-control"
                                    value={this.state.startDate}
                                    name={name}
                                    autoComplete="off"
                                    onChange={this.onStartDatePick}

                        />
                        <DatePicker style={{zIndex:"10"}}
                            // selected={date}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="end-date"
                                    className="form-control"
                                    value={this.state.endDate}
                                    name={name}
                                    autoComplete="off"
                                    onChange={this.onEndDatePick}

                        />
                    </div>
                    <div className={"col-md-12"}>
                        <label className={"col-md-3"}>
                            Lister Name
                        </label>
                        <div className={"col-md-9"}>
                            {this.state.primaryData.lister_name}
                        </div>
                    </div>
                    <div className={"col-md-12"}>
                        <label className={"col-md-3"}>
                            Koordinator Name
                        </label>
                        <div className={"col-md-9"}>
                            {this.state.primaryData.koordinator &&
                            this.state.primaryData.koordinator.map( data => {
                                return(
                                    <div>
                                        {data.agent_name}
                                        <br />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData  />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>}
                                          {...this.state} {...this.props}/>
            </div>
        )
    }
}