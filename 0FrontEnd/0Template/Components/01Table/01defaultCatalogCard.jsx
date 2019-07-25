import React from 'react'
import DefaultBaseInfiniteTable from "./00defaultBaseInfiniteTable.jsx";
import News from "../00Default/02News/News.jsx";
import "./01defaultCatalogCard.scss"
import LogoImg from "~Assets/img/template/logo.png"

const DefaultShowData = function(props){
    var {columnStructure, item, index} = props;
    var paragraph=(
        <p>
            Randy Testing Paragraph HereRandy Testing Paragraph Here
            Randy Testing Paragraph HereRandy Testing Paragraph Here
            Randy Testing Paragraph HereRandy Testing Paragraph Here
            Randy Testing Paragraph HereRandy Testing Paragraph Here
            Randy Testing Paragraph HereRandy Testing Paragraph Here
        </p>
    )

    var topClass = index%2 == 0 ?"col-md-5":"col-md-offset-1 col-md-5";

    return (
        <div className={topClass}>
            <div className={'randyCard wow'}>
                <News title={<h1>Headline</h1>} image={LogoImg} paragraph={paragraph} author={"randy"}/>
                {columnStructure.map((headColumn, index)=>{
                    return (
                    <div key={'CatalogCard'+index}>
                        <span className={'col-xs-6'} style={{textAlign:'right',fontWeight:'bold'}}>{headColumn['label']}</span>
                        <span className={'col-xs-6'} style={{textAlign:'left'}}>{item[headColumn['id']]}</span>
                    </div>
                    )
                })
                }
            </div>
        </div>
    )
}

class DefaultCatalogCard extends React.Component{

    componentWillMount(){

        var listStructure = window.show?window.show:[];
        var baseUrl = window.baseUrl?window.baseUrl:'baseurl/perlu/ada/woy/';
        var page = window.page?window.page:1;
        if (listStructure.length <= 0){
            console.error(" !! NEED THE SHOW COLUMN TO USE THIS ONE !!")
        }

        this.state = {
            // Data
            columnStructure:listStructure,
            baseUrl:baseUrl,
            'ajaxCall':this.props.ajaxCall?this.props.ajaxCall:this.props.baseUrl+"/list/ajax",
            page:page,
            searchText:this.props.searchText,
            // Option
            isShowHidden:false,
            isInfiniteScroll:true,
            limitPage:5,
        }
    }

    render() {
        return (
            <div className={"CatalogCard"}>
                <DefaultBaseInfiniteTable contentShown={<DefaultShowData />} contentHidden={<span/>} header={<span/>} {...this.state}/>
            </div>
        )
    }
}

export default DefaultCatalogCard;