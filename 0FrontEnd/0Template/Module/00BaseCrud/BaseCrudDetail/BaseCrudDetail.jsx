import React from 'react'
import DefaultDetailView from "~Components/02Detail/00defaultDetailView.jsx";

class BaseCrudDetail extends React.Component{

    constructor(){
        super();
        var listStructure = window.show?window.show:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var searchText = window.search?window.search:"";
        var dataId = window.dataId?parseInt(window.dataId):null;

        if (listStructure.length <= 0){
            console.error("don't use this without show column header")
        }

        this.state = {
            // Data
            listStructure: listStructure,
            baseUrl:baseUrl,
            ajaxCall:"/"+baseUrl+"/detail/ajax",
            dataId:dataId
        }
    }

    render() {
        return (
            <div>
                {console.log(this.state.listStructure)}
                <DefaultDetailView {...this.state}/>
            </div>
        )
    }
}

export default BaseCrudDetail;