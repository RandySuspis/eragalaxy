// slider, banner, infinite list, catalog, alert
// HOW TO MAKE INFINITE SCROLL, PAGINATION, SEARCH
import './backend.scss'
import React, { Component } from "react";
import ReactDOM from "react-dom";

import {LoginContainer, SignUp, ForgotPasswordContainer} from "../0Template/Module/01Login/loginModule.jsx"

import {BaseCrudList, BaseCrudDetail, BaseCrudDelete, BaseCrudCreate, BaseCrudUpdate} from "../0Template/Module/00BaseCrud/baseCrudModule.jsx"
import DefaultPopUp from "../0Template/Components/00Default/03Popup/00defaultBaseModal.jsx"
import DefaultToast from "../0Template/Components/00Default/04Toast/00defaultBaseToast.jsx"

import BranchOfficeReport from "../0Template/Module/02PropertyAgent/BranchOfficeReport/branchOfficeReport.jsx"
import {PropertyAgentListContainer} from "../0Template/Module/02PropertyAgent/propertyAgentModule.jsx"
import PrimaryPropertyCreate from "../0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyCreate.jsx"
import PrimaryPropertyUpdate from "../0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyUpdate.jsx"
import PrimaryPropertyReport from "../0Template/Module/02PropertyAgent/PrimaryPropertyCreate/primaryPropertyReport.jsx"
import PrimaryPropertyList from "../0Template/Module/02PropertyAgent/PrimaryPropertyList/primaryProjectListContainer.jsx"
// import TransactionPrimaryCreate from "../0Template/Module/02PropertyAgent/TransactionPrimaryCreate/transactionPrimaryCreate.jsx"

import TransactionCreate from "../0Template/Module/03TransactionCommission/TransactionCreate/transactionCreate.jsx"
import TransactionPrimaryCreate from "../0Template/Module/03TransactionCommission/TransactionCreate/transactionPrimaryCreate.jsx"
import PropertyAgentReport from "../0Template/Module/02PropertyAgent/PropertyAgentReport/propertyAgentReport.jsx";

function callContainer(id, formCall){
    var element = document.getElementById(id);
    if (element != null){
        ReactDOM.render(formCall, element);
    }
}

window.pickPropsOrDefault = function (props, id, defaultElement, passingData){
    var result = defaultElement;
    if (props[id]) {
        if (isFunction(props[id])){
            console.log('call function'+passingData);
            result = props[id](passingData);
        }else{
            result = props[id];
        }
    }
    if (passingData){
        const { ...otherProps } = result.props;
        for (var key in passingData) {
            var value = passingData[key]
            otherProps[key] = value;
        }
        result = React.cloneElement(result, otherProps, null);
    }
    return result
}

window.isFunction = function (functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

window.ifNotExistThen = function(props, key){
    var result = props.key;
    if (result){
        return result;
    }
    alert("props "+key+"is not exist");
}

if ('BASECRUD') {
    callContainer('baseCRUDList', <BaseCrudList/>)
    callContainer('baseCRUDDetail', <BaseCrudDetail/>)
    callContainer('baseCRUDDelete', <BaseCrudDelete/>)
    callContainer('baseCRUDCreate', <BaseCrudCreate/>)
    callContainer('baseCRUDUpdate', <BaseCrudUpdate/>)
    callContainer('TestPopup', <DefaultPopUp/>)
    callContainer('TestToast', <DefaultToast/>)
}

// Call LoginContainer Module
if ('LOGIN'){
    callContainer("login", <LoginContainer/>)
    callContainer("signup", <SignUp/>)
    callContainer("forgotPassword",<ForgotPasswordContainer/>)
}

if ('BRANCH'){
    callContainer("branchOfficeReport",<BranchOfficeReport/>)
}

// Call Property Agent Module
if ('PROPERTYAGENT') {
    callContainer('propertyAgentList', <PropertyAgentListContainer/>)
    callContainer('propertyAgentCreate', <BaseCrudCreate/>)
    callContainer('propertyAgentUpdate', <BaseCrudUpdate/>)
    callContainer('propertyAgentReport', <PropertyAgentReport/>)
}

if ('PRIMARYPROJECT') {
    callContainer('primaryPropertyList', <PrimaryPropertyList/>)
    callContainer('primaryPropertyCreate', <PrimaryPropertyCreate/>)
    callContainer('primaryPropertyUpdate', <PrimaryPropertyUpdate/>)
    callContainer('primaryPropertyReport', <PrimaryPropertyReport/>)
}

if ('TRANSACTIONPRIMARY'){
    callContainer('transactionPrimaryCreate', <TransactionPrimaryCreate/>)
    callContainer('transactionCreate', <TransactionCreate/>)
}

console.log("gila kamu");
