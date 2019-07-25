import React from 'react'
import "./index.scss"
import BaseNavbar from "~/0Template/Components/00Default/08Navbar/00baseNavbar.jsx"

const NotificationData = function(props){
    return (
        <React.Fragment/>
    )
}


const ProfileData = function(props){
    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/profile">
                            <div><img alt="" src="/images/member.png" /></div>
                            <br/>
                            MEMBER
                        </a>
                    </div>
                </div>
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/receipts">
                            <div><img alt="" src="/images/receipt.png" /></div>
                            <br/>
                            RECEIPT
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/reservations">
                            <div><img alt="" src="/images/reservation.png" /></div>
                            <br/>
                            MY RESERVATION
                        </a>
                    </div>
                </div>
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/vouchers">
                            <div><img alt="" src="/images/voucher.png" /></div>
                            <br/>
                            VOUCHER
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className={"profile_bottom"}>
                        <a href="/logout">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default class MainNavbarContainer extends React.Component{




    constructor(){
        super();
        const element = document.getElementById('mainNavbarContainer')
        console.log(element);
        const props = Object.assign({}, element.dataset)

        this.state = {
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
            }, {
                title: "Login",
                title_type: "text", // text/icon
                link: "/login",
                appendClass: "nav-login-account",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""
            }, {
                title: "Register",
                title_type: "text", // text/icon
                link: "/register",
                appendClass: "nav-login-account right-padding",
                isDropdown: false,
                appendDropdownLinkClass: "",
                appendDropdownContentClass: "",
                isCustomDropdown: false,
                dropdownArray: [],
                dropdownContent: ""

            }],
            use_drawer: true,
            drawer_menu: []
        }
    }

    render() {
        return (
            <React.Fragment>
                <BaseNavbar {...this.state}/>
            </React.Fragment>
        )
    }
}
