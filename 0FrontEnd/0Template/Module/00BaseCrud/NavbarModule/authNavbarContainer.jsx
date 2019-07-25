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
                            <div className={"name"}>MEMBER</div>
                        </a>
                    </div>
                </div>
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/receipts">
                            <div><img alt="" src="/images/receipt.png" /></div>
                            <br/>
                            <div className={"name"}>RECEIPT</div>
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
                            <div className={"name"}>MY RESERVATION</div>
                        </a>
                    </div>
                </div>
                <div className="col">
                    <div className={"profile_item"}>
                        <a href="/vouchers">
                            <div><img alt="" src="/images/voucher.png" /></div>
                            <br/>
                            <div className={"name"}>VOUCHER</div>
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


export default class AuthNavbarContainer extends React.Component{




    constructor(){
        super();
        const element = document.getElementById('authNavbarContainer')
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
                title: "fa fa-bell",
                title_type: "icon", // text/icon
                link: "#",
                appendClass: "nav-login-account",
                isDropdown: true,
                appendDropdownLinkClass: "text-light waves-effect",
                appendDropdownContentClass: "navbar_notification_content",
                isCustomDropdown: true,
                dropdownArray: [],
                dropdownContent: <NotificationData />
            }, {
                title: navbar_name,
                title_type: "text", // text/icon
                link: "#",
                appendClass: "nav-login-account right-padding",
                isDropdown: true,
                appendDropdownLinkClass: "text-light waves-effect",
                appendDropdownContentClass: "navbar_profile_content",
                isCustomDropdown: true,
                dropdownArray: [],
                dropdownContent: <ProfileData />

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
