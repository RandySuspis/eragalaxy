import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";

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
                    <div className="col-xs-2" > {props.item.total_gross} </div>
                    <div className="col-xs-3" > {props.item.top_agent} </div>
                    <div className="col-xs-2" > {props.item.total_commission} </div>
                </div>
            </React.Fragment>

    )

}


export default class BranchOfficeReport extends React.Component{
    constructor() {
        super();
        var ajaxCall = "/"+baseUrl+"/detail/ajax";

        this.state = {
            baseUrl: "/api/branch/report",
            ajaxCall:ajaxCall,
            componentStatus:'ready',
            primary_project_id:1,
            data: [],
            // data: [{
            //     office_name: "Abcdef",
            //     total_gross: "10000000",
            //     top_agent: "Randy",
            //     total_commission: "20000000"
            // },{
            //     office_name: "aBcdef",
            //     total_gross: "30000000",
            //     top_agent: "rAndy",
            //     total_commission: "40000000"
            // },{
            //     office_name: "abCdef",
            //     total_gross: "50000000",
            //     top_agent: "raNdy",
            //     total_commission: "60000000"
            // },{
            //     office_name: "abcDef",
            //     total_gross: "70000000",
            //     top_agent: "ranDy",
            //     total_commission: "80000000"
            // },{
            //     office_name: "abcdEf",
            //     total_gross: "90000000",
            //     top_agent: "randY",
            //     total_commission: "100000000"
            // }],

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
            <div className="branchOfficeReport">
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData  />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>}
                                          {...this.state} {...this.props}/>
            </div>
        )
    }
}