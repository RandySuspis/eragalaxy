import React, { Component } from "react";
import posed, { PoseGroup } from 'react-pose'
import BaseTable from "./00baseInfiniteTable.jsx"
import PropTypes from "prop-types";
import "./00defaultBaseInfiniteTable.scss"
import request from "../../Shared/RequestWrapper.jsx";

const FadeRow = posed.div({
    showing : {
        opacity:0.5,
        delay:100000
    },
    hidden : {
        opacity:0.5,
        delay:150
    }
})

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
                {columnStructure.map( (item, index) => {
                    return (
                        <div className={ item.width +" columnHeader"} key={'DynamicHideShowTableHeader'+item.id+index}>
                            {item.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const DefaultAction = function(props){
    return (
        <React.Fragment>
            <a href={props.baseUrl+"/view/"+props.item.id}> View </a>
            <a href={props.baseUrl+"/create"}> Create </a>
            <a href={props.baseUrl+"/update/"+props.item.id}> Edit </a>
            <a href={props.baseUrl+"/delete/"+props.item.id}> Delete </a>
        </React.Fragment>
    )
}

const DefaultShowData = function(props){
    var {columnStructure, item, visible} = props;
    return (
        <div className={'row col-xs-12 randyRow'}>
            {columnStructure.map((headColumn, index)=>{
                if (headColumn.id == 'action'){
                    return <div className={ headColumn.width +" columnContent"} key={'columnContent'+index+item[headColumn.id]}>
                        <span className={'col-xs-6 visible-xs-block'}>&nbsp;</span>
                        <span className={'col-sm-12'}>{DefaultAction(props)}</span>
                    </div>
                }else{
                    return  <div className={ headColumn.width +" columnContent"} key={'columnContent'+index+item[headColumn.id]}>
                        <span className={'col-xs-6 visible-xs-block'}>{[headColumn.label]}</span>
                        <span className={'col-sm-12'}>{item[headColumn.id]}</span>
                    </div>
                }
                })
            }
        </div>
    )
}

const DefaultHiddenData = function(props){
    return (
        <div className={'row col-xs-12 randyHiddenRow'}>
            <div className={'col-sm-offset-3 col-sm-3'}>Just Example For Hiding</div>
            <div className={'col-sm-6'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
        </div>
    );
}

const DefaultFooter= function({callData, currentPage}){
    return (
        <div className="footer" onClick={callData.bind(this, false, currentPage+1)}>
            <div className='btn btn-primary'> Show More Data </div>
        </div>
    )
}

class DefaultBaseInfiniteTable extends Component{

    componentWillMount(){
        this.state = {
            data:[],
            searchText: this.props.searchText?this.props.searchText:"",
            componentStatus:'ready',
            // 00pagination related
            page : this.props.page?this.props.page:1,
            totalData: 9999,
            totalPage:99
        };

        window.onpopstate = (event) =>{
            this.changeData(event.state);
        }

    }

    static propTypes = {
        headerElement: PropTypes.element,
        footerElement: PropTypes.element,
        showDataElement: PropTypes.element,
        hiddenDataElement: PropTypes.element,
        action: PropTypes.element,
        page:PropTypes.number.isRequired,
        searchText:PropTypes.string,
        // Options
        limitPage: PropTypes.number,
        baseUrl: PropTypes.string.isRequired,
        ajaxCall: PropTypes.string.isRequired,
        isInfiniteScroll:PropTypes.bool,
        isShowHidden: PropTypes.bool,
        headerColumn:PropTypes.array,
        headerWidth:PropTypes.array
    }

    static defaultProps = {

    }

    callMoreData = (resetData, page, pushState=true) => {

        if (this.state.componentStatus != 'loading'){

            var callUrl = (this.props.ajaxCall?this.props.ajaxCall:this.props.baseUrl+"/list/ajax");
            if (this.state.data.length < this.state.totalData || resetData){
                var page = page;
                var result = this.state.data;
                var dataPerPage = this.props.limitPage;

                if (resetData){
                    result = [];
                }

                this.setState({
                    componentStatus: 'loading'
                });

                request({
                    url:    callUrl,
                    method: 'GET',
                    params:   {
                        'search[value]': this.state.searchText,
                        'search[regex]': false,
                        'start':(page-1)*dataPerPage,
                        'length':dataPerPage
                    }
                }).then(response => {
                    var totalPage = Math.ceil(response.data.recordsFiltered/dataPerPage);

                    result.push(...response.data.data);
                    this.setState({
                        data: result,
                        page: page,
                        componentStatus: 'ready',
                        totalData: response.data.recordsFiltered,
                        totalPage:totalPage
                    });

                    // Change and Save State For History
                    if (pushState){
                        if(page == 1){
                            var urlPath = this.props.baseUrl+'/list/';
                        }else{
                            var urlPath = this.props.baseUrl+'/list/'+(page);
                        }
                        if (this.state.searchText){
                            urlPath += "?search="+this.state.searchText;
                        }
                        window.history.pushState(this.state,"", urlPath);
                    }
                })

            }
        }
    }

    changeData = (data) => {
        this.setState(data);
    }

    callSearch = () =>{
        this.callMoreData(true, 1);
    }

    changeSearchText = (e)=>{
        this.setState({searchText:e.target.value});
        var oldSearch = e.target.value;
        setTimeout(
            ()=>{
                if (this.state.searchText == oldSearch){
                    this.callSearch();
                }
            }, 500
        )
    }

    render(){
        setTimeout(() => {this.setState({visible:true})},3000)
        var passItemShowHidden = {
            'columnStructure':this.props.columnStructure,
            'baseUrl':this.props.baseUrl,
            'visible':this.state.visible};

        return(
            <div className={"DefaultBaseInfiniteTable"}>
                <BaseTable
                    header={window.pickPropsOrDefault(this.props,'header',<DefaultHeader
                        doSearch={this.callSearch}
                        searchText={this.state.searchText}
                        changeSearchText={this.changeSearchText}
                        columnStructure = {this.props.columnStructure}
                        baseUrl = {this.props.baseUrl}

                    />)}
                    footer={window.pickPropsOrDefault(this.props,'footer',<DefaultFooter callData={this.callMoreData} currentPage={this.state.page}/>)}

                    contentShown={window.pickPropsOrDefault(this.props,'contentShown', <DefaultShowData/>, passItemShowHidden)}
                    contentHidden={window.pickPropsOrDefault(this.props,'contentHidden', <DefaultHiddenData/>, passItemShowHidden)}
                    data={this.props.data ? this.props.data : this.state.data}
                    callData={this.props.callMoreData ? this.props.callMoreData : this.callMoreData}
                    primaryColumn={'show_id'}
                    show={this.props.header}
                    isShowHidden={this.props.isShowHidden}
                    isInfiniteScroll={this.props.isInfiniteScroll}
                    // ---------- PAGINATION ---------
                    currentPage={this.state.page}
                    limitPage={5}
                    totalPage={this.state.totalPage}
                    searchText={this.props.search}
                    type={this.props.type}
                />
            </div>
        )
    }
}

export default DefaultBaseInfiniteTable;