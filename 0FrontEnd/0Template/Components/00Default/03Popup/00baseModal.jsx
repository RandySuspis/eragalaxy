import React, { Component } from "react";
import posed, { PoseGroup } from 'react-pose'
import PropTypes from "prop-types";
import "./00baseModal.scss"

// if you are wondering why, so many level of Class
// it's because, i need to stop propagation
// and one component is considered as 1 big button
// you won't able to stop propagation if it's 1 element
// https://stackoverflow.com/questions/38619981/react-prevent-event-bubbling-in-nested-components-on-click

const Animation = posed.div({
    enter: {
        opacity: 1,
        height:"100vh",
        transition: { duration: 150 }
    },
    exit: {
        opacity: 0,
        height:"0vh",
        transition: { duration: 150 }
    }
});


class BaseModal extends Component {

    static propTypes = {
        flexibleWidth: PropTypes.bool.isRequired,
        isOpen: PropTypes.bool.isRequired,
        content: PropTypes.element.isRequired,
        buttonClose: PropTypes.element.isRequired,
        closeModal: PropTypes.func.isRequired,
    }

    render() {
        var classPop = 'BaseModal';
        if (this.props.isOpen){
            classPop = 'BaseModal show';
        }

        if (this.props.flexibleWidth){
            classPop += ' flexibleWidth';
        }

        return (
            <PoseGroup>
                {
                    this.props.isOpen &&
                    <Animation key={'baseModal'} className={'BaseModal'}>
                        <div className={classPop} onClick={this.props.closeModal} style={{position:'fixed'}}>
                            <InnerModal
                                closeModal={this.props.closeModal} padding={this.props.padding} content={this.props.content}
                                flexibleWidth={this.props.flexibleWidth} buttonClose={this.props.buttonClose} />
                        </div>
                    </Animation>
                }
            </PoseGroup>
        );
    }
}

class InnerModal extends Component {
    stopBubblingEvent = (e) => {
        e.stopPropagation();
    }

    render() {
        var style = {left:this.props.padding,
            right:this.props.padding,
            top:this.props.padding,
            bottom:this.props.padding};
        if (this.props.flexibleWidth){
            style = {
                top: '10vh'
            };
        }
        return (
            <div className='innerModal' onClick={this.stopBubblingEvent} style={style}>
                <CloseButton closeModal={this.props.closeModal} buttonClose={this.props.buttonClose}/>
                <span className='ModalContentHolder'>
                    <div className='ModalContent'>
                        {this.props.content}
                    </div>
                </span>
            </div>
        );
    }
}

class CloseButton extends Component {

    handleCloseUp = (e) => {
        e.stopPropagation();
        this.props.closeModal();
    }

    render() {
        return (
            <span onClick={this.handleCloseUp}>
                {this.props.buttonClose}
            </span>
        );
    }
}

export default BaseModal;