import React, { Component } from "react";
import "./registerContainer.scss";
import {FieldEmail, FieldPassword} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class RegisterStep1Container extends React.Component{
    constructor() {
        super();
        this.state = {
            urlRegister: "/register",
            initialValue: {
                email: "",
                password: "",
            }

        };
    }

    fieldValidation = (values) => {
        let errors = {};
        let re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!values.email) { errors.email = "Username is required" }
        if (values.email && !re.test(values.email)) { errors.email = "Please enter a valid email" }
        if (!values.password) { errors.password = "Password is required" }

        return errors;
    }

    submitForm  = (values, actions) => {
        document.getElementById("formReference").submit();
    }

    render() {
        return (
            <div className={"registerStep1Div"}>
                <p>
                    <form method={"POST"} action={"/register/email"}>
                        <input type={"submit"} className="btn register_btn btn-primary form-control" value={"Register With E-mail"}/>
                        <input type={"hidden"} name={"_token"} value={csrf_token} />
                    </form>
                </p>
                <div style={{padding:"30px", textAlign:"center"}}>Atau</div>
                <p><a href={"/login/socialmedia/google"} className="btn register_google_btn btn-primary form-control">Register With Google</a></p>
                <p><a href={"/login/socialmedia/facebook"} className="btn register_facebook_btn btn-primary form-control">Register With Facebook</a></p>
            </div>

        )
    }
}

const RegisterFooter = function (props) {
    return (
        <div className="register-footer">
            <p>Sudah punya Akun?</p><p><a href={props.routeLogin}>Login sekarang</a>.</p>
        </div>
    )
}

class RegisterStep1 extends Component {

    constructor() {
        super();

        this.state = {
            routeLogin: "/login",
            isOpen: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { seo_title } = this.state;
        return (
            <div className="form-register">
                <div>
                    <RegisterStep1Container />
                    <RegisterFooter
                        routeLogin = {this.state.routeLogin}/>
                </div>
            </div>
        );
    }
}

export default RegisterStep1;
