import React, { Component } from "react";
import BaseCrudList from "../../00BaseCrud/BaseCrudList/BaseCrudList.jsx"
import DefaultBaseModal from "../../../Components/00Default/03Popup/00defaultBaseModal.jsx"
import "./index.scss"

class PropertyAgentListContainer extends Component{

    render(){
        return(
            <BaseCrudList contentShown={<PropertyShowData/>}/>
        )
    }
}

class PropertyShowData extends Component{

    state = {
        isOpen:false
    }

    actionProperty(props){
        return ( <React.Fragment>
            <a href={"/"+props.baseUrl+"/update/"+props.item.id}> Edit </a>
            <div onClick={this.toggleModal}> Delete </div>
        </React.Fragment>
        )
    }

    toggleModal = ()=>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }

    render(){
        var {columnStructure, item, visible} = this.props;
        return (
            <div className={'row col-xs-12 randyRow'}>
                {columnStructure.map((headColumn, index)=>{
                    if (headColumn.id == 'action'){
                        return <div className={ headColumn.width +" columnContent"} >
                            <span className={'col-xs-6 visible-xs-block'}> &nbsp;</span>
                            <span className={'col-sm-12'}>{this.actionProperty(this.props)}</span>
                            <DefaultBaseModal isOpen={this.state.isOpen} closeModal={this.toggleModal.bind(this)}
                                              content={<DeleteModalComponent item={item} baseUrl={"/"+this.props.baseUrl+"/delete/"+item.id} method={"post"} />} />
                        </div>
                    }else{
                        var value = item[headColumn.id];
                        var index = 0;

                        // If this is name
                        if (headColumn.id === "name"){
                            value = <b>{item[headColumn.id]}</b>;
                        }

                        // If this is MGM or SPV
                        if (headColumn.id === "mgm"){
                            value =
                                <React.Fragment>
                                    {item[headColumn.id].map( mgm => {
                                        index++;
                                        return <span key={index+mgm}>({index}) {mgm}<br/></span>
                                    })}
                                </React.Fragment>
                        }

                        return  <div className={ headColumn.width +" columnContent"} >
                            <span className={'col-xs-6 visible-xs-block'}>{[headColumn.label]}</span>
                            <span className={'col-xs-6'}>{value}</span>
                        </div>
                    }
                })
                }
            </div>
        )
    }

}

class DeleteModalComponent extends Component{
    render(){
        return (
        <div className="col-xs-12" style={{textAlign:'center'}}>
            <div className="col-xs-12">
                <h1>ARE YOU REALLY WANT TO DELETE THIS ONE </h1>
            </div>
            <div className="col-xs-6">
                <span className='btn btn-primary'> CANCEL </span>
            </div>
            <div className="col-xs-6">
                <form method={this.props.method} action={this.props.baseUrl}>
                        <input type='hidden' value={csrf_token} name="_token"/>
                        <input type='submit' className='btn btn-danger' value="DELETE" />
                </form>
            </div>
        </div>
        )
    }
}

export default PropertyAgentListContainer;