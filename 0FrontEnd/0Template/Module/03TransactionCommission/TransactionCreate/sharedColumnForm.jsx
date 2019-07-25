import React, { Component } from "react";

const FormCol1Layout = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
                <span className={"col-md-12"}>
                {props.field1}
            </span>
        </span>
}

const FormCol2Layout = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-xs-12 col-md-6"}>
                {props.field1}
            </span>
            <span className={"col-xs-12 col-md-6"}>
                {props.field2}
            </span>
    </span>
}

const FormCol2Layout2 = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-md-5"}>
                {props.field1}
            </span>
            <span className={"col-md-7"}>
                {props.field2}
            </span>
    </span>
}

const FormCol2Layout3 = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-md-9"}>
                {props.field1}
            </span>
            <span className={"col-md-3"}>
                {props.field2}
            </span>
    </span>
}

const FormCol2PPHSection = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-xs-12 col-md-7"}>
                {props.field1}
            </span>
            <span className={"col-xs-12 col-md-5"}>
                {props.field2}
            </span>
    </span>
}

const FormCol4BonusSection = function(props) {
    return <span className={"col-xs-12 col-md-12 col-md-12 col-lg-12 input-group form-group"} style={{display:"inline-block"}}>
            <span className={"col-xs-12 col-md-6"}>
                {props.field1}
            </span>
            <span className={"col-xs-offset-6 col-md-offset-0 col-xs-6 col-md-2"}>
                <span className={"col-xs-12"}>
                    {props.field2}
                </span>
            </span>
            <span className={"col-xs-12 col-md-4"}>
                {props.field3}
            </span>
    </span>
}



const LinePlus= function(props){
    return <span className={"line-plus"}>
        <span className={"line"}> </span>
        <span className={"plus"}> + </span>
    </span>
}



var BasicLayout = {};

BasicLayout.basicLayoutGeneralInfo = (keyname, label, touched, content) => {
    return (<React.Fragment>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'}>
                <b>{label}</b>
                </span>
        <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'}>
                {content}
            </span>
    </React.Fragment>)
}

BasicLayout.basicLayoutRupiah = (keyname, label, field) => {
    return (<React.Fragment>
            <span className={'col-xs-1 col-lg-2 labelSection'} style={{width:"10%", paddingRight:"10px", paddingLeft:"10px"}}>
                <b>{label}</b>
                </span>
        <span className={'col-xs-11 col-lg-10 inputSection'} style={{width:"90%", textAlign:"right"}}>
                {field}
            </span>
    </React.Fragment>)
}

BasicLayout.basicLayoutPercentField = (keyname, label, field) => {
    return (<React.Fragment>
            <span className={'col-xs-5 col-sm-5 col-lg-5 labelSection'}>
                <b>{label}</b>
                </span>
        <span className={'col-xs-7 col-sm-7 col-lg-7 inputSection'}>
                {field}
            </span>
    </React.Fragment>)
}

BasicLayout.basic = (keyname, label, touched, content) => {
    return (<React.Fragment>
            <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 labelSection'}>
                <b>{label}</b>
                </span>
        <span className={'col-sm-12 col-sm-12 col-md-6 col-lg-6 contentSection'}>
                {content}
            </span>
    </React.Fragment>)
}

BasicLayout.basicLayout2 = (keyname, label, touched, content) => {
    return (<React.Fragment>
            <span className={'col-sm-12 col-lg-5 labelSection'}>
                <b>{label}</b>
                </span>
        <span className={'col-sm-12 col-lg-7 contentSection'}>
                {content}
            </span>
    </React.Fragment>)
}

BasicLayout.basicLayout3 = (keyname, label, content) => {
    return (<React.Fragment>
            <span className={'col-sm-12 col-lg-2 labelSection'}>
                <b>{label}</b>
                </span>
        <span className={'col-sm-12 col-lg-10 contentSection'}>
                {content}
            </span>
    </React.Fragment>)
}

BasicLayout.basicLayout4 = (keyname, touched, content) => {
    return (<React.Fragment>
            <span className={'col-sm-12 col-lg-12 inputSection'}>
                <b>{content}</b>
            </span>
    </React.Fragment>)
}


export {
    FormCol1Layout,
    FormCol2Layout,
    FormCol2Layout2,
    FormCol2Layout3,
    FormCol2PPHSection,
    FormCol4BonusSection,
    LinePlus,
    BasicLayout
}