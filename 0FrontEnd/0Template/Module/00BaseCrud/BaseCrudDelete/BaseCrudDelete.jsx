import React from 'react'
import DefaultDetailView from "~Components/02Detail/00defaultDetailView.jsx";
import DefaultBaseModal from "~Components/00Default/03Popup/00defaultBaseModal.jsx"

const DefaultFooter= function({baseUrl, item, openModal}){
    return (
        <div className="row footer">
            <div className="col-xs-12 col-sm-offset-9 col-sm-3" onClick={openModal}>
                <div className='col-sm-12 btn btn-danger' > Delete </div>
            </div>
        </div>
    )
}

const DefaultContent= function({baseUrl, dataId, csrf_token}){
    return (
        <div className="col-xs-12" style={{textAlign:'center'}}>
            <div className="col-xs-12">
                <h1>ARE YOU REALLY WANT TO DELETE THIS ONE </h1>
            </div>
            <div className="col-xs-6">
                <span className='btn btn-primary'> CANCEL </span>
            </div>
            <div className="col-xs-6">
                <form method="POST" action={"/"+baseUrl+"/delete/"+dataId}>
                    <input type='hidden' value={csrf_token} name="_token"/>
                    <input type='submit' className='btn btn-danger' value="DELETE" />
                </form>
            </div>
        </div>
    )
}

class BaseCrudDelete extends React.Component{

    constructor(){
        super();
        var listStructure = window.show?window.show:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var dataId = window.dataId?parseInt(window.dataId):null;

        if (listStructure.length <= 0){
            console.error("don't use this without show column header")
        }

        this.state = {
            // Data
            listStructure: listStructure,
            baseUrl:baseUrl,
            ajaxCall:"/"+baseUrl+"/detail/ajax",
            dataId:dataId,
            csrf_token:window.csrf_token
        }
    }

    toggleModal = () => {
        this.setState({isOpen:!this.state.isOpen});
    }

    render() {
        return (
            <div>
                <DefaultDetailView {...this.state} footer={<DefaultFooter openModal={this.toggleModal}/>}/>
                <DefaultBaseModal isOpen={this.state.isOpen} closeModal={this.toggleModal.bind(this)}
                                  content={<DefaultContent baseUrl={this.state.baseUrl} dataId={this.state.dataId} csrf_token={this.state.csrf_token}/>  }/>
            </div>
        )
    }
}


export default BaseCrudDelete;