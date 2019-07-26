import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";
import ReactExport from "react-export-excel";
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
                <div className="col-xs-3" > Name </div>
                <div className="col-xs-3" > Office Name </div>
                <div className="col-xs-2" > Transaksi </div>
                <div className="col-xs-3" > Gross Komisi </div>
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
                <div className="col-xs-3" > {props.item.name} </div>
                <div className="col-xs-3" > {props.item.office_name} </div>
                <div className="col-xs-2" > {props.item.transactionCount} </div>
                <div className="col-xs-3" > {GalaxyHelper.numberWithCommas(props.item.gross)} </div>
            </div>
        </React.Fragment>

    )

}

const Download = function (props) {
    return (
        <ExcelFile element={<button>Download Data</button>} filename={"Agent"}>
            <ExcelSheet data={props.props} name="Agent">
                <ExcelColumn label="No" value="index"/>
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Office Name" value="office_name"/>
                <ExcelColumn label="Transaksi" value="transactionCount"/>
                <ExcelColumn label="Gross Komisi" value="gross"/>
            </ExcelSheet>
        </ExcelFile>
    )
}


export default class PropertyAgentReport extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            baseUrl: "/api/agent/report",
            ajaxCall:ajaxCall,
            componentStatus:'ready',
            primary_project_id:1,
            data: [],

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
                        data: response.data.data.data,
                    });
                })
            }
        }
    }

    // RENDER
    render() {
        return (
            <div className="propertyAgentReport">
                {this.state.data &&
                <div style={{float:"right", padding:"10px"}}>
                    <Download props={this.state.data}/>
                </div>}
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData  />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>}
                                          {...this.state} {...this.props}/>
            </div>
        )
    }
}