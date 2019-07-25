import React, { Component } from "react";
import PropTypes from "prop-types";
import "./00baseToast.scss"

// if you are wondering why, so many level of Class
// it's because, i need to stop propagation
// and one component is considered as 1 big button
// you won't able to stop propagation if it's 1 element
// https://stackoverflow.com/questions/38619981/react-prevent-event-bubbling-in-nested-components-on-click

const DefaultCloseButton = function(){
    return (
        <div className='closeButton'>
            <img src='/EraTheme/img/close.png' width="30px" />
        </div>
    )
}

class BaseToast extends Component {

    static propTypes = {
        content: PropTypes.element.isRequired,
    }

    render() {

        var classPop = 'BaseToast';
        if (this.props.isOpen){
            classPop = 'BaseToast show';
            this.props.closeToast(Math.random());
        }
        return (
            <div className={classPop}>
                <InnerPopup closeToast={this.props.closeToast} position={this.props.position} closeButton={this.props.closeButton}>
                    {this.props.content}
                </InnerPopup>
            </div>
        );
    }
}

class InnerPopup extends Component {
    stopBubblingEvent = (e) => {
        // e.stopPropagation();
        this.props.closeToast(0);
    }

    getPosition(position) {
        var style = {}

        switch (position) {
            case "bottom":
                style = {
                    bottom:'20px'};
                break;
            case "top":
                style = {
                    top:'20px'};
                break;

        }
        return style;
    }

    render() {
        var style = this.getPosition("bottom");

        return (
            <div className='innerPopup' onClick={this.stopBubblingEvent} style={style}>
                <CloseButton closeToast={this.props.closeToast} closeButton={this.props.closeButton}/>
                <span className='popupContentHolder'>
                    <div className='popupContent'>
                        {this.props.children}
                    </div>
                </span>
            </div>
        );
    }
}

class CloseButton extends Component {

    handleCloseUp = (e) => {
        e.stopPropagation();
        this.props.closeToast(0);
    }

    render() {
        return (
            <span onClick={this.handleCloseUp}>
                {this.props.closeButton?this.props.closeButton:<DefaultCloseButton/>}
            </span>
        );
    }
}

export default BaseToast;