import React, { Component } from "react";

import propTypes from "prop-types";
import BaseModal from "./00baseModal.jsx";
import News from "../02News/News.jsx";
import "./00baseModal.scss"
import imgClose from "./close.png"
// import imgClose from "~Assets/img/template/close.png"

const DefaultContent = function(){
    return (
        <div className={'col-sm-12'}>
            <div className={'col-sm-12'}>
                <News/>
            </div>
            <div className={'col-sm-12'}>
                <News/>
            </div>
            <div className={'col-sm-12'}>
                <News/>
            </div>
            <div className={'col-sm-12'}>
                <News/>
            </div>
            <div className={'col-sm-12'}>
                <News/>
            </div>
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

class DefaultBaseModal extends Component {

    constructor(){
        super();
        this.state = {
            padding: '20%'
        }
    }

    static propTypes = {
        isOpen:propTypes.bool.isRequired,
        closeModal:propTypes.func.isRequired,
        content:propTypes.element.isRequired,
        flexibleWidth:propTypes.number,
        padding:propTypes.number,
        buttonClose:propTypes.element,
    }

    static defaultProps = {
        flexibleWidth: true,
        padding : '20%',
    }

    toggleModal= () => {
        this.setState({isOpen:!this.state.isOpen});
    }

    render() {
        return (
            <div className='DefaultBaseModal'>
                <BaseModal
                    closeModal={this.props.closeModal?this.props.closeModal:this.toggleModal}
                    isOpen={this.props.isOpen}
                    content = {this.props.content?this.props.content:<DefaultContent />}
                    buttonClose ={this.props.closeButton?this.props.buttonClose:<DefaultCloseButton />}
                    flexibleWidth = {this.props.flexibleWidth}
                    {...this.state}
                />
            </div>
        );
    }
}

export default DefaultBaseModal;