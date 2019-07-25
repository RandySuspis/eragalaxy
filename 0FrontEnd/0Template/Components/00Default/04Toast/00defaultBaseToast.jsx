import React, { Component } from "react";
import PropTypes from "prop-types";
import BasePopup from "./00baseToast.jsx";
import "./00baseToast.scss"
import imgClose from "../03Popup/close.png";

const DefaultContent = function(){
    return (
        <div className={'col-sm-12'} style={{textAlign:'center'}}>
            <h1>Hi this is testing toast, Need to create some animation though</h1>
        </div>
    )
}

const DefaultCloseButton = function(){
    return (
        <div className='closeButton'>
            <img src={imgClose} width="30px" />
        </div>
    )
}

class DefaultBaseToast extends Component {

    constructor(){
        super();
        this.state = {
            isOpen : false,
            zIndex : 1500,
            position : 'top'
        }
    }

    closeToast= (number) => {
        if (number == 0){
            this.setState({isOpen:false});
        }else{
            setTimeout(()=>{
                this.setState({isOpen:false});
            },2000);
        }
    }

    openToast = () => {
        this.setState({isOpen:true});
    }

    render() {
        return (
            <div className='DefaultBasePopup'>
                <div onClick={this.openToast}>Click Here To Test</div>
                <BasePopup
                    closeToast={this.closeToast}
                    modalState={this.state.isOpen}
                    closeButton = {<DefaultCloseButton />}
                    content = {<DefaultContent />}
                    {...this.state}
                />


            </div>
        );
    }
}

export default DefaultBaseToast;