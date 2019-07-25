import React, { Component } from "react";
import PropTypes from "prop-types";
import EmptyList from "../00Default/01emptyList/EmptyList.jsx";
import Paging from "../00Default/00pagination/Paging.jsx";

// HOW TO RECEIVE A COMPONENT
// HOW TO ADD Function on Sent Component

const HideShowTableContent = function(props){

    if (props.type == 'table'){
        var hiddenContent = null;
        var index = props.index;
        if (props.hovering == props.index){
            hiddenContent = props.contentHidden;
        }
        var evenOdd = index%2 == 0 ?"even":"odd";

        var contentShown = props.contentShown;
        return (
            <div className={"contentTable " + evenOdd} id={props.id} onMouseEnter={props.mouseEnter} onMouseLeave={props.mouseLeave} key={props.index}>
                {contentShown}
                {hiddenContent}
            </div>
        )
    }else if (props.type == 'card') {
        var contentShown = props.contentShown;
        return (
            <React.Fragment>
                {contentShown}
            </React.Fragment>
        )
    }
}

class BaseInfiniteTable extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
            username: "marks.dana@example.net",
            password: "p4ssw0rd",
            monthList:[],
            dateList:[]
        };
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        callData: PropTypes.func.isRequired,
        isInfiniteScroll:PropTypes.bool,
        isShowHidden: PropTypes.bool,
        currentPage: PropTypes.number.isRequired,
        totalPage: PropTypes.number.isRequired,
        limitPage: PropTypes.number,
        contentShown:PropTypes.element.isRequired,
        contentHidden:PropTypes.element.isRequired,
        footer:PropTypes.element.isRequired,
        header:PropTypes.element.isRequired,
    }

    static defaultProps = {
        // data: PropTypes.string.isRequired,
        // urlAjax: PropTypes.string.isRequired,
        // callData: PropTypes.func.isRequired,
        isInfiniteScroll:true,
        isShowHidden: false,
        // currentPage: PropTypes.number.isRequired,
        // totalPage: PropTypes.number.isRequired,
        limitPage: 10,
        type:"table"
    }


    componentDidMount() {
        this.props.callData(true, this.props.currentPage);

        if (this.props.isInfiniteScroll){
            var offset = 300;
            // make sure infinite Scroll down
            window.onscroll = () => {
                // console.log(window.innerHeight +'|'+ document.documentElement.scrollTop + ":" + document.documentElement.offsetHeight);

                if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset){
                    this.props.callData(false, this.props.currentPage+1);
                }
            }
        }
    }

    mouseEnter(dataId){
        if (this.props.isShowHidden){
            this.setState({hovering:dataId})
        }

    }

    mouseLeave(dataId){
        if (this.props.isShowHidden) {
            this.setState({hovering: null})
        }
    }

    render() {
        // Checking if isInfiniteScroll
        var footer = null;
        if (this.props.isInfiniteScroll){
            footer = this.props.footer;
        }else{
            footer = (<Paging currentPage={this.props.currentPage} totalPage={this.props.totalPage} limitPaginationNumber={this.props.limitPage} callData={this.props.callData}/>);
        }

        // Checking Empty List or not
        if (this.props.data.length <= 0){
            return(
                <div className={'row BaseInfiniteTable'}>
                    <div className={'row col-xs-12'}>
                        {this.props.header}
                    </div>
                    <div className={'row col-xs-12'}><EmptyList/></div>
                    <div className={'row col-xs-12'}>
                        {footer}
                    </div>
                </div>
            );
        }

        var index = 0;
        return (
            <div className={'BaseInfiniteTable'}>
                <div className={"row"}>
                    <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        {this.props.header}
                    </div>
                    <div className={"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <div className={this.props.type == 'table' ? 'col-xs-12 col-sm-12 col-md-12 col-lg-12' : 'row'}>
                            {this.props.data.map( item => {
                                index = index+1;
                                return <HideShowTableContent
                                    mouseEnter={this.mouseEnter.bind(this, index)}
                                    mouseLeave={this.mouseLeave.bind(this, index)}
                                    contentHidden = {window.pickPropsOrDefault(this.props, 'contentHidden', null, {'item':item, 'index':index})}
                                    contentShown = {window.pickPropsOrDefault(this.props, 'contentShown', null, {'item':item, 'index':index})}
                                    hovering = {this.state.hovering}
                                    index={index}
                                    show_id = {item[this.props.primaryColumn]}
                                    isShowHidden = {this.props.isShowHidden}
                                    key={"baseInfinite"+index+item[0]}
                                    type={this.props.type}/>
                            })}
                        </div>

                    </div>
                    <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        {footer}
                    </div>
                </div>
            </div>
        );
    }
}

export default BaseInfiniteTable;