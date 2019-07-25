import React from 'react'
import DefaultDetailView from "../../02Detail/00defaultDetailView.jsx";
import DefaultBaseModal from "./00defaultBaseModal.jsx"

const DefaultFooter= function({baseUrl, item, openModal}){
    return (
        <div className="row footer">
            <div className="col-xs-12 col-sm-offset-9 col-sm-3" onClick={openModal}>
                <div className='col-sm-12 btn btn-danger' > Delete </div>
            </div>
        </div>
    )
}

const DefaultContent= function({baseUrl, item, openModal}){
    return (
        <div className="col-xs-12" style={{textAlign:'center'}}>
            <div className="col-xs-12">
                <h1>ARE YOU REALLY WANT TO DELETE THIS ONE </h1>
            </div>
            <div className="col-xs-6">
                <span className='btn btn-primary'> CANCEL </span>
            </div>
            <div className="col-xs-6">
                <span className='btn btn-danger'> DELETE </span>
            </div>
        </div>
    )
}

class BaseCrudList extends React.Component{

    constructor(){
        super();
        var showColumn = window.show?window.show:[];
        var showColumnWidth = window.showWidth?window.showWidth:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var searchText = window.search?window.search:"";
        var page = window.page?parseInt(window.page):1;

        if (showColumn.length <= 0){
            console.error("don't use this without show column header")
        }

        if (showColumnWidth.length<=0){
            // Start to count the width

        }

        this.state = {
            // Data
            headerColumn:showColumn,
            headerWidth:showColumnWidth,
            baseUrl:baseUrl,
            page:page,
            searchText:searchText,
            // Option
            isShowHidden:true,
            isInfiniteScroll:false,
            limitPage:5,
            // popup
            isOpen: false

        }
    }

    toggleModal = () => {
        this.setState({isOpen:!this.state.isOpen});
    }

    render() {
        return (
            <div>
                <DefaultDetailView {...this.state} footer={<DefaultFooter openModal={this.toggleModal}/>}/>
                <DefaultBaseModal  isOpen={this.state.isOpen} closeModal={this.toggleModal.bind(this)} content={<DefaultContent />}/>
            </div>
        )
    }
}


export default BaseCrudList;