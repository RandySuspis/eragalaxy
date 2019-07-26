;import React, { Component } from "react";
import DefaultBaseModal from "../../../Components/00Default/03Popup/00defaultBaseModal.jsx"
import "./primaryProjectListContainer.scss"
import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";

export default class PrimaryPropertyList extends React.Component{
    constructor(){
        super();

        var listStructure = window.show?window.show:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var page = window.page?window.page:1;
        var searchText = window.search?window.search:"";

        this.state = {
            // Data
            // columnStructure:listStructure,
            // headerColumn:showColumn,
            // headerWidth:showColumnWidth,
            baseUrl:baseUrl,
            page:page,
            searchText:searchText,
            // Option
            isShowHidden:true,
            isInfiniteScroll:false,
            isPagination:true,
            limitPage:20,
        }
    }

    render() {

        return (
            <div className={"baseCrudCreate"}>
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData />} contentHidden={<DefaultHiddenData />}
                                          header={<DefaultHeader baseUrl={this.state.baseUrl}/>} isShowHidden={true}
                                          {...this.state} {...this.props}/>
                {/*<DefaultCatalogCard {...this.state}/>*/}
            </div>
        )
    }
}

const DefaultHeader = function(props){
    var {columnStructure} = props;
    return (
        <div className={'header'}>
            <div className={'row'}>
                <div className="col-sm-4" style={{marginBottom: '20px'}}>
                    <input type='text' className={'form-control'} onChange={props.changeSearchText} value={props.searchText} placeholder={"Search Here"}/>
                </div>
                <a href={"/"+props.baseUrl+"/create"}>
                    <div className="col-xs-12 col-sm-offset-4 col-sm-4 " >
                        <div className={'btn btn-primary'} style={{width:'100%'}}>
                            Create
                        </div>
                    </div>
                </a>
            </div>

            <div className="row hidden-xs" >
                <div className="col-xs-3" > Project Name </div>
                <div className="col-xs-5" > Project Koordinator </div>
                <div className="col-xs-3" > Project Keterangan </div>
            </div>
        </div>
    )
}

const DefaultHiddenData = function(props){
    var {item} = props;
    var index = 0;
    return (
        <div className={'row col-xs-9 randyHiddenRow'}>
            <div className={'col-sm-6'}>
                {item.agent.map(agen =>{
                    index ++;
                    return(
                        <React.Fragment>
                            <div className={'col-sm-12'}>
                                <b className={'col-sm-8'}>({index}) Nama</b>
                                <b className={'col-sm-2'}>Komisi</b>
                                <b className={'col-sm-2'}>id</b>
                            </div>
                            <div className={'col-sm-12'}>
                                <span className={'col-sm-8'}>{agen.agent_name}</span>
                                <span className={'col-sm-2'}>{agen.percent_commission}%</span>
                                <span className={'col-sm-2'}>{agen.agent_id}</span>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
            <div className={'col-sm-6'}>
                <div className={'col-sm-12'}>
                { item.note &&
                    <div>
                        {item.note}
                    </div>
                }
                </div>
                <div className={'col-sm-12 row propertyPercent'}>
                    { item.percent_listing_commission &&
                        <div className={'col-sm-6'}>
                            <b>Kantor Listing</b><br/>
                            <b>{item.percent_listing_commission} %</b><br/>
                        </div>
                    }
                    { item.percent_listing_commission &&
                    <div className={'col-sm-6'}>
                        <b>Komisi Selling</b><br/>
                        <b>{item.percent_selling_commission} %</b>
                    </div>
                    }
                    { item.percent_listing_commission &&
                    <div className={'col-sm-12'}>
                        <b>Kantor Selling</b><br/>
                        <b>{item.percent_selling_commission} %</b>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

class DefaultShowData extends Component{

    state = {
        isOpen:false
    }

    render(){
        var {columnStructure, item, visible} = this.props;
        var index = 0;
        return (
            <React.Fragment>
            <div className={'col-xs-3 randyRow'}>
                {item.project_name}
            </div>
            </React.Fragment>

        )
    }

}
