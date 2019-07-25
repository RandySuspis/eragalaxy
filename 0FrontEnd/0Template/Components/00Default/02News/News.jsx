import React, { Component } from "react";
import propTypes from 'prop-types'
import logo from '~Assets/img/template/logo.png'

import "./News.scss"

class News extends Component{

    static propTypes = {
        title: propTypes.element,
        image: propTypes.string.isRequired,
        paragraph: propTypes.element.isRequired,
    }

    static defaultProps = {
        title: <h1 style={{textAlign:'center'}}>sample News</h1>,
        image: logo,
        paragraph:(
            <p>
                Randy Testing Paragraph HereRandy Testing Paragraph Here
                Randy Testing Paragraph HereRandy Testing Paragraph Here
                Randy Testing Paragraph HereRandy Testing Paragraph Here
                Randy Testing Paragraph HereRandy Testing Paragraph Here
                Randy Testing Paragraph HereRandy Testing Paragraph Here
            </p>
        ),
    }

    render(){
        return(
            <div className={'row col-xs-12 news'}>
                {this.props.title}
                <img src={this.props.image} style={{width:'50%', padding:'10px'}}/>

                {this.props.paragraph}
                <span></span>
            </div>
        )
    }
}

export default News;
