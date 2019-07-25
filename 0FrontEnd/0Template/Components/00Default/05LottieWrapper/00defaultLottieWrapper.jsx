import React, { Component } from "react";
import Lottie from 'react-lottie';
import PropTypes from "prop-types";
import 'babel-polyfill';

// Be careful on importing lottie/*.json, this lottie wrapper have problem with bundling.json
// can effecting bundling process time, but other than that i don't see any problem
// Randy: will postpone this problem for now

export default class DefaultLottieWrapper extends Component {

    constructor(){
        super();
    }

    state = {
        animation : "",
        isPaused: true,
        isStopped:true
    }

    async componentDidMount() {
        var lottieName = this.props.animationName;

        const animation = await import(/* webpackChunkName: "lottie/[request]" */
        ('~Assets/lottie/'+lottieName+'.json'));
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animation.default
        };
        this.setState({
            animation: <div className={this.props.className}>
                <Lottie key="lottie-win-jobs"
                        options={defaultOptions}
                        isStopped={this.props.isStopped}
                        width={200}
                        height={200}
                />
            </div>
        })
    }


    render() {
        const buttonStyle = {
            display: 'block',
            margin: '10px auto'
        };
        return (
            <div className='DefaultBasePopup'>
                {this.state.animation}
                <button style={buttonStyle} onClick={() => this.setState({isStopped: true})}>stop</button>
                <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>play</button>
                <button style={buttonStyle} onClick={() => this.setState({isPaused: !this.state.isPaused})}>pause</button>
            </div>
        );
    }
}

