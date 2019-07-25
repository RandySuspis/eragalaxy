import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./Paging.scss"

class EmptyList extends Component{

    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        totalPage: PropTypes.number.isRequired,
        limitPaginationNumber: PropTypes.number.isRequired,
    }

    clickPages = (pageNumber, totalPage, classAdd) => {
        if (classAdd == 'first'){
            this.props.callData(true, 1);
        }else if (classAdd == 'last'){
            this.props.callData(true, totalPage);
        }else{
            this.props.callData(true, parseInt(pageNumber,10));
        }

    }

    render(){
        var {currentPage, totalPage, limitPaginationNumber} = this.props;
        var midLimit = Math.floor(limitPaginationNumber/2);
        var startingPoint = currentPage - midLimit;
        var result = [];

        if (startingPoint < 1){
            startingPoint = 1;
        }
        result.push('First');
        startingPoint = (startingPoint < 0)?0:startingPoint;

        for (var i = startingPoint; i < totalPage+1 && i < startingPoint+limitPaginationNumber ; i++){
            result.push(i+'');
        }
        result.push('Last');

        var pageActive = false;

        return(
            <div className={"Paging"}>
                <div className={"pageContainer"}>
                    {result.map((index, i)=> {
                        var active = (this.props.currentPage == index)?"active":"";
                        var shown = index;
                        var addClass = '';
                        if (i == 0){
                            addClass = 'first';
                            shown = '';
                        }else if(i == result.length - 1){
                            addClass = 'last'
                            shown = '';
                        }
                        return (
                            <span key={"paging"+shown+index} className={'PagingNumber '+ active + " " +addClass} onClick={this.clickPages.bind(this, shown, this.props.totalPage, addClass)} >
                                {index}
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default EmptyList;
