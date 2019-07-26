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
                <div className="col-xs-4" > Office Name </div>
                <div className="col-xs-2" > Total Gross </div>
                <div className="col-xs-3" > Top Agent </div>
                <div className="col-xs-2" > Total Komisi </div>
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
                    <div className="col-xs-4" > {props.item.office_name} </div>
                    <div className="col-xs-2" > {GalaxyHelper.numberWithCommas(props.item.total_gross)} </div>
                    <div className="col-xs-3" > {props.item.top_agent} </div>
                    <div className="col-xs-2" > {GalaxyHelper.numberWithCommas(props.item.total_commission)} </div>
                </div>
            </React.Fragment>

    )

}

const Download = function (props) {
    return (
        <ExcelFile element={<button>Download Data</button>} filename={"Branch"}>
            <ExcelSheet data={props.props} name="Branch">
                <ExcelColumn label="No" value="index"/>
                <ExcelColumn label="Office Name" value="office_name"/>
                <ExcelColumn label="Total Gross" value="total_gross"/>
                <ExcelColumn label="Top Agent" value="top_agent"/>
                <ExcelColumn label="Total Komisi" value="total_commission"/>
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
            baseUrl: "/api/branch/report",
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
            <div className="branchOfficeReport">
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