// slider, banner, infinite list, catalog, alert
// HOW TO MAKE INFINITE SCROLL, PAGINATION, SEARCH
import './frontend.scss'
import React, { Component } from "react";
import ReactDOM from "react-dom";

import {AuthNavbarContainer, MainNavbarContainer} from "~/0Template/Module/00BaseCrud/navbarModule.jsx";

import {LoginContainer, RegisterStep1, RegisterStep2, RegisterStep3, ProfileContainer, ChangePasswordContainer, EditProfileContainer, ForgotPasswordContainer, ForgotPasswordFieldContainer} from "~/0Template/Module/01Login/loginModule.jsx"
import DemoCarousel from "~/0Template/Components/00Default/06Carousel/00demoCarousel.jsx"


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

// Call LoginContainer Module
if ('LOGIN'){
    callContainer("login", <LoginContainer/>)
    callContainer("profileContainer", <ProfileContainer/>)
    callContainer("registerStep1", <RegisterStep1/>)
    callContainer("registerStep2", <RegisterStep2/>)
    callContainer("registerStep3", <RegisterStep3/>)
    callContainer("changePasswordContainer", <ChangePasswordContainer/>)
    callContainer("editProfileContainer", <EditProfileContainer/>)
    callContainer("forgotPasswordContainer", <ForgotPasswordContainer/>)
    callContainer("forgotPasswordFieldContainer", <ForgotPasswordFieldContainer/>)
}

callContainer("mainNavbarContainer", <MainNavbarContainer/>)
callContainer("authNavbarContainer", <AuthNavbarContainer/>)

callContainer("testCarousel", <DemoCarousel/>)