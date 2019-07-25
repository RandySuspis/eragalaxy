import React, { Component } from "react";
import request from "../../../Shared/RequestWrapper.jsx";
import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";

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
                <div className="col-xs-3" > {props.item.gross} </div>
            </div>
        </React.Fragment>

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
            // data: [{
            //     office_name: "Abcdef",
            //     transaction: "10",
            //     name: "Randy",
            //     total_commission: "20000000"
            // },{
            //     office_name: "aBcdef",
            //     transaction: "30",
            //     name: "rAndy",
            //     total_commission: "40000000"
            // },{
            //     office_name: "abCdef",
            //     transaction: "50",
            //     name: "raNdy",
            //     total_commission: "60000000"
            // },{
            //     office_name: "abcDef",
            //     transaction: "70",
            //     name: "ranDy",
            //     total_commission: "80000000"
            // },{
            //     office_name: "abcdEf",
            //     transaction: "90",
            //     name: "randY",
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
            <div className="propertyAgentReport">
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData  />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>}
                                          {...this.state} {...this.props}/>
            </div>
        )
    }
}