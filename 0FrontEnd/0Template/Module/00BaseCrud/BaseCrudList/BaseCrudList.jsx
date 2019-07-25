import React from 'react'

import DefaultBaseInfiniteTable from "../../../Components/01Table/00defaultBaseInfiniteTable.jsx";
import DefaultBaseModal from "../../../Components/00Default/03Popup/00defaultBaseModal.jsx"
import DefaultCatalogCard from "../../../Components/01Table/01defaultCatalogCard.jsx";

export default class BaseCrudList extends React.Component{

    constructor(){
        super();

        var listStructure = window.show?window.show:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var page = window.page?window.page:1;
        var searchText = window.search?window.search:"";


            // Start to count the width
        var showColumnWidth=[];
        var classSM = 'col-sm-12';
        if (listStructure.length==2){
                showColumnWidth = ['col-sm-6','col-sm-6']
            }else if (listStructure.length==3){
                showColumnWidth = ['col-sm-4','col-sm-4','col-sm-4']
            }else if (listStructure.length==4){
                showColumnWidth = ['col-sm-3','col-sm-3','col-sm-3','col-sm-3']
            }else if (listStructure.length==5){
                showColumnWidth = ['col-sm-1','col-sm-3','col-sm-3','col-sm-3','col-sm-2']
            }else if (listStructure.length==6){
                showColumnWidth = ['col-sm-1','col-sm-3','col-sm-3','col-sm-2','col-sm-2','col-sm-1']
            }else if (listStructure.length==7){
                showColumnWidth = ['col-sm-1','col-sm-2','col-sm-2','col-sm-2','col-sm-2','col-sm-2','col-sm-1',]
            }else if (listStructure.length==8){
                showColumnWidth = ['col-sm-1','col-sm-2','col-sm-2','col-sm-2','col-sm-2','col-sm-1','col-sm-1','col-sm-1',]
            }else if (listStructure.length==9){
                showColumnWidth = ['col-sm-1','col-sm-2','col-sm-2','col-sm-2','col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1',]
            }else if (listStructure.length==10){
                showColumnWidth = ['col-sm-1','col-sm-2','col-sm-2','col-sm-1','col-sm-1','col-sm-1',
                    'col-sm-1','col-sm-1','col-sm-1','col-sm-1']
            }else if (listStructure.length==11){
                showColumnWidth = ['col-sm-1','col-sm-2','col-sm-1','col-sm-1','col-sm-1','col-sm-1',
                    'col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1']
            }else if (listStructure.length==12){
                showColumnWidth = ['col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1',
                    'col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1','col-sm-1',]
            }


        for (var i = 0; i < showColumnWidth.length; i++) {
            if (!listStructure[i].width){
                listStructure[i].width = showColumnWidth[i];
            }
        }


        this.state = {
            // Data
            columnStructure:listStructure,
            // headerColumn:showColumn,
            headerWidth:showColumnWidth,
            baseUrl:baseUrl,
            page:page,
            searchText:searchText,
            // Option
            isShowHidden:false,
            isInfiniteScroll:false,
            isPagination:true,
            limitPage:5,
        }
    }

    render() {

        return (
            <div>
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData />} {...this.state} {...this.props}/>
                {/*<DefaultCatalogCard {...this.state}/>*/}
            </div>
        )
    }
}

class DefaultShowData extends React.Component{

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
                                              content={<DefaultDeleteModal item={item} baseUrl={"/"+this.props.baseUrl+"/delete/"+item.id} method={"post"} />} />
                        </div>
                    }else{
                        var value = item[headColumn.id];
                        var index = 0;

                        // If this is name
                        if (headColumn.id === "name"){
                            value = <b>{item[headColumn.id]}</b>;
                        }

                        // If this is MGM or SPV
                        if (headColumn.id === "mgm" || headColumn.id === "spv"){
                            value = <React.Fragment>
                                {item[headColumn.id].map( mgm => {
                                    index++;
                                    return <span key={index+mgm}>({index}) {mgm}<br/></span>
                                })}
                            </React.Fragment>;
                        }

                        return  <div className={ headColumn.width +" columnContent"} >
                            <span className={'col-xs-6 visible-xs-block'}>{[headColumn.label]}</span>
                            <span className={'col-sm-12'}>{value}</span>
                        </div>
                    }
                })
                }
            </div>
        )
    }

}

class DefaultDeleteModal extends React.Component{
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
