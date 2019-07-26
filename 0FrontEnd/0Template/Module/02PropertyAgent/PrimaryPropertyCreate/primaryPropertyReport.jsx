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
                <div className="col-xs-1" > No </div>
                <div className="col-xs-2" > Primary </div>
                <div className="col-xs-3" > Total Gross </div>
                <div className="col-xs-3" > Total Transaksi </div>
                <div className="col-xs-3" > Total </div>
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
                <div className="col-xs-1" > {props.index} </div>
                <div className="col-xs-2" > {props.item.name} </div>
                <div className="col-xs-3" > {GalaxyHelper.numberWithCommas(props.item.total_gross)} </div>
                <div className="col-xs-3" > {props.item.transaction_count} </div>
                <div className="col-xs-3" > {GalaxyHelper.numberWithCommas(props.item.total)} </div>
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


export default class BranchOfficeReport extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";
        var dateNow = this.formatDate(new Date());
        var dateBefore = this.formatDateBefore(new Date());

        this.state = {
            baseUrl: "/api/primary/report",
            ajaxCall:ajaxCall,
            componentStatus:'ready',
            primary_project_id:1,
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
                    }
                }).then(response => {
                    this.setState({
                        componentStatus: 'ready',
                        data: response.data.data.data,
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
                <div style={{padding:"10px"}}>
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
                    {this.state.data &&
                    <div style={{float:"right", padding:"10px"}}>
                        <Download props={this.state.data}/>
                    </div>}
                </div>
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData  />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>}
                                          {...this.state} {...this.props}/>
            </div>
        )
    }
}