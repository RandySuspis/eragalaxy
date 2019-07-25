import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./00demoCarousel.scss";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from "prop-types";


class DemoCarousel extends Component {

    sliderData(item, index){
        return (
            <div className={"slider " + index}>
                <div className={"image-carousel"} style={{backgroundImage: "url("+item.image+")"}}></div>
                <div className={"titleField"}>
                    <p className="title"> {item.title}</p>
                    <p className="size"> {index} / {this.props.data.length}</p>
                </div>
            </div>
        )
    }

    onChange(){
    }

    onClickItem(){
    }

    onClickThumb(){
    }


    static propTypes = {
        autoPlay: PropTypes.bool,
        showArrows: PropTypes.bool,
        showStatus: PropTypes.bool,
        showIndicators: PropTypes.bool,
        showThumbs: PropTypes.bool,
        infiniteLoop: PropTypes.bool,
        axis: PropTypes.string, //horizontal / vertical
        verticalSwipe: PropTypes.string, //standard / natural
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        onClickItem: PropTypes.func,
        onClickThumb: PropTypes.func,

    }


    static defaultProps = {
        autoPlay: true,
        showArrows: true,
        showStatus: false,
        showIndicators: false,
        showThumbs: true,
        infiniteLoop: true,
        axis: 'horizontal',
        verticalSwipe: 'standard',
        data: [{
            id: 1,
            image: 'https://media.wired.com/photos/5b11706136ad230cb43f0d3c/master/w_799,c_limit/FB-Trending.png',
            title: 'Title 1'
        }, {
            id: 2,
            image: 'https://media.wired.com/photos/5b11706136ad230cb43f0d3c/master/w_799,c_limit/FB-Trending.png',
            title: 'Title 3'
        }],

    }



    render() {
        var index=0;
        return (
            <Carousel autoPlay={this.props.autoPlay}
                      showArrows={this.props.showArrows}
                      showStatus={this.props.showStatus}
                      showIndicators={this.props.showIndicators}
                      showThumbs={this.props.showThumbs}
                      infiniteLoop={this.props.infiniteLoop}
                      axis={this.props.axis}
                      verticalSwipe={this.props.verticalSwipe}
                      onChange={this.onChange}
                      onClickThumb={this.onClickThumb}
                      onClickItem={this.onClickItem}>

                {this.props.data.map( (item) => {
                    index = index+1;
                    return this.sliderData(item, index)
                })}
            </Carousel>
        );
    }
}

export default DemoCarousel;

