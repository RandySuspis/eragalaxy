import React, { Component } from "react";
import PropTypes from "prop-types";
import "./00defaultDetailView.scss"
import request from "../../Shared/RequestWrapper.jsx";

const DefaultHeader = function(props){
    return (
        <div className={'header row'}>
            <div className={'col-sm-9'} >
                <div className={'col-sm-6'} >
                    Admin : Randy S
                </div>
                <div className={'col-sm-6'} style={{textAlign:'right'}}>
                    Monday, 12 April 2019
                </div>
            </div>
            <div className={'col-xs-12 col-sm-3'} >
                <a href={props.baseUrl+"/create"}>
                    <div className="" >
                        <div className={'btn btn-primary'} style={{width:'100%'}}>
                            Create
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

const DefaultShowData = function(props){
    var {listStructure, item} = props;
    return (
        <span className='allContentSection'>
            {listStructure.map((column) => {
                if (column.id != "action"){
                    return (<div className={'col-sm-6 col-md-4 col-lg-4 col-xl-3'} key={column.id}>
                        <div className={'row contentSection'}>
                            <span className={'col-xs-6 columnSection'}>{column.label}</span>
                            <span className={'col-xs-6 valueSection'}>{item[column.id]}</span>
                        </div>
                    </div>)
                }
            })}
        </span>
    )
}

const DefaultFooter= function({baseUrl, item}){
    return (
        <div className="row footer">
            <div className="col-xs-12 col-sm-offset-8 col-sm-4">
                <a href={baseUrl+'/update/'+ item.id}><div className='col-sm-6 btn btn-primary'> Edit </div></a>
                <a href={baseUrl+'/delete/'+ item.id}><div className='col-sm-6 btn btn-primary'> Delete </div></a>
            </div>
        </div>
    )
}

class DefaultDetailView extends Component{

    constructor(){
        super()
        this.state = {
            item:{},
            componentStatus:'ready'
        }
    }
    componentWillMount() {
        this.callData()
    }

    callData = () => {
        if (this.state.componentStatus != 'loading'){

            this.setState({
                componentStatus: 'loading'
            });

            request({
                url:    this.props.ajaxCall,
                method: 'GET',
                params:   {'id': this.props.dataId}
            }).then(response => {
                this.setState({
                    item: response.data.data,
                    componentStatus: 'ready',
                });
            })

        }
    }

    render(){
        var passingItem = {baseUrl:this.props.baseUrl, item:this.state.item};
        return (
            <div className={'DefaultDetailView'}>
                <div className={'col-xs-12'}>
                    {window.pickPropsOrDefault(this.props, 'header', <DefaultHeader item={this.state.item} {...this.props}/>, passingItem)}
                </div>
                <div className={'col-xs-12'}>
                    <DefaultShowData item={this.state.item} {...this.props} />
                </div>
                <div className={'col-xs-12'}>
                    {window.pickPropsOrDefault(this.props, 'footer', <DefaultFooter item={this.state.item} {...this.props} />, passingItem)}
                </div>
            </div>
        )
    }

}

export default DefaultDetailView;