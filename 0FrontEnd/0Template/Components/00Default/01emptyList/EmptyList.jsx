import React, { Component } from "react";
import img_no_data from "../../../../1Assets/img/Template/no_data.png"
import "./EmptyList.scss"

class EmptyList extends Component{

    render(){
        return(
            <div className={"EmptyList"}>
                <img src={img_no_data} />
            </div>
        )
    }
}

export default EmptyList;
