import React, { Component } from 'react';
import "./00baseNavbar.scss";
import PropTypes from "prop-types";


class BaseNavbar extends Component {

    renderImage(image){
        return (
            <img src={image} alt={""}/>
        )
    }


    renderIcon(icon){
        return (
            <i className={icon}>&nbsp;</i>
        )
    }


    menuData(item, index){
        if (item.isDropdown){
            if (item.isCustomDropdown){
                //use dropdown content
                return (
                    <li className={"nav-item dropdown "+item.appendClass}>
                        <a className={"nav-link dropdown-toggle "+item.appendDropdownLinkClass} href="#" data-toggle="dropdown">
                            {item.title_type == "text" ? item.title : ''}
                            {item.title_type == "icon" ? this.renderIcon(item.title): ''}
                        </a>
                        <ul className={"dropdown-menu "+item.appendDropdownContentClass}>
                            {item.dropdownContent}
                        </ul>
                    </li>
                )
            } else{
                return (
                    <li className={"nav-item dropdown "+item.appendClass}>
                        <a className={"nav-link dropdown-toggle "+item.appendDropdownLinkClass} href="#" data-toggle="dropdown">
                            {item.title_type == "text" ? item.title : ''}
                            {item.title_type == "icon" ? this.renderIcon(item.title): ''}
                        </a>
                        <ul className={"dropdown-menu "+item.appendDropdownContentClass}>
                            {item.dropdownArray.map( (item) => {
                                index = index+1;
                                return this.menuData(item, index)
                            })}
                        </ul>
                    </li>
                )
            }
        } else{
            return (
                <li className={"nav-item "+item.appendClass}>
                    <a className={"nav-link js-scroll-trigger "} href={item.link}>
                        {item.title_type == "text" ? item.title : ''}
                        {item.title_type == "icon" ? this.renderIcon(item.title): ''}
                    </a>
                </li>
            )
        }
    }

    static propTypes = {
        title: PropTypes.string,
        title_type: PropTypes.string, // image/text
        menus: PropTypes.array.isRequired,
        use_drawer: PropTypes.bool,
        drawer_menu: PropTypes.array
    }


    static defaultProps = {
        title: "/images/logo.png",
        title_type: "image", // image/text
        menus: [{
                title: "Home",
                title_type: "text", // text/icon
                link: "/",
                appendClass: "",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""
            }, {
                title: "Outlet",
                title_type: "text", // text/icon
                link: "/outlet/list",
                appendClass: "",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""
            }, {
                title: "Reservation",
                title_type: "text", // text/icon
                link: "/reservations/booking",
                appendClass: "",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""
            }, {
                title: "Promo",
                title_type: "text", // text/icon
                link: "/promo",
                appendClass: "",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""
        }],
        use_drawer: true,
        drawer_header: "",
        drawer_menu: []
    }



    render() {
        console.log("NAVBAR RENDER");
        var index=0;
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-none d-xs-none d-sm-none d-md-none d-lg-flex d-xl-flex" id="mainNav">
                    <a className="navbar-brand js-scroll-trigger" href="/">
                        {this.props.title_type == "text" ? this.props.title : ''}
                        {this.props.title_type == "image" ? this.renderImage(this.props.title) : ""}
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            {this.props.menus.map( (item) => {
                                index = index+1;
                                return this.menuData(item, index)
                            })}
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default BaseNavbar;

