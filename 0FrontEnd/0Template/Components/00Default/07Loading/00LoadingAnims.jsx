import React, { Component } from 'react';
import { Loader } from 'react-loader-spinner'
import PropTypes from "prop-types";


class LoadingAnims extends Component {

    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
        display: PropTypes.bool
    }


    static defaultProps = {
        type: "RevolvingDot",
        color: "#000000",
        height: "80",
        width: "80"
    }



    render() {
        var index=0;
        return (
            <div>
                {this.state.display ? <Loader type={this.props.type}
                                              color={this.props.color}
                                              height={this.props.height}
                                              width={this.props.width} /> : ''}
            </div>

        );
    }
}

export default LoadingAnims;
