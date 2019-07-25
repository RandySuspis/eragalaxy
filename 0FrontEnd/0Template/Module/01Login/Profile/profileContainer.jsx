import React, { Component } from "react";
import "./profileContainer.scss";
import QRCode from "qrcode.react";

class ProfileContainer extends Component {

    constructor() {
        super();
        var photourl = "user.png";
        if (photo != '') photourl = photo;

        this.state = {
            name: name,
            email: email,
            photo: photourl,
            code: code,
            point: point,
            editProfileURL: "/editProfile"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div className={"profileDiv"}>
                <div className="row justify-content-xs-center justify-content-sm-center justify-content-md-center">
                    <div className="col-xs-6 col-sm-4 col-md-2">
                        <div className={"imgContainer"} style={{
                            backgroundImage: "url('/user_uploads/"+this.state.photo+"')",
                            backgroundSize: "cover",
                            marginTop:"-120px",
                            border: "5px SOLID #FFD700"
                        }}>
                        </div>
                    </div>
                </div>
                <p className={"bigText"}><a href={this.state.editProfileURL}>{this.state.name}</a></p>
                <p className={"smallText"}>{this.state.email}</p>

                <div className={"row justify-content-xs-center justify-content-sm-center justify-content-md-center"}>
                    <div className={"col-md-2 cardDesc"}>
                        <p align="center"><b>{this.state.point} pts</b></p>
                    </div>

                    <div className={"col-md-2 cardDesc"}>
                        <a href={"/user/benefits"}><p align="center"><b>GOLD Member</b></p></a>
                    </div>
                </div>

                <br />

                <div className={"row justify-content-xs-center justify-content-sm-center justify-content-md-center"}>
                    <div className={"col-md-4"} style={{
                        textAlign: "center"
                    }}>
                        <QRCode value="http://facebook.github.io/react/" size={256}/>
                        <p align="center"><b>{this.state.code}</b></p>
                    </div>
                </div>

                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-md-3"}>
                            <a href={"/notifications"} className={"btn btn-profile"}>Notification</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/reservations"} className={"btn btn-profile"}>My Reservations</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/changePassword"} className={"btn btn-profile"}>Change Password</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/help"} className={"btn btn-profile"}>Help</a>
                        </div>
                        <div className="w-100"></div>
                        <div className={"col-md-3"}>
                            <a href={"/requestsong"} className={"btn btn-profile"}>Request Song</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/points"} className={"btn btn-profile"}>Point</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/kritiksaran"} className={"btn btn-profile"}>Kritik Saran / Rating</a>
                        </div>
                        <div className={"col-md-3"}>
                            <a href={"/keepingbottle"} className={"btn btn-profile"}>Keeping Bottle</a>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }
}

export default ProfileContainer;
