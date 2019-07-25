import React, { Component } from "react";
import {FieldEmail, FieldPassword} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";
import "./loginContainer.scss";
import "./randy.scss";

import logo from '~Assets/img/template/logo.png';

class LoginForm extends React.Component{
    constructor() {
        super();
        this.state = {
            urlLogin: "/login",
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
            <Formik initialValues={this.state.initialValue}
                    validate={this.fieldValidation}
                    onSubmit={this.submitForm}
                    render={({values, errors, status, touched, isSubmitting, form}) => (
                        <Form action={this.state.urlLogin} method="post" id={"formReference"}>
                            <input type="hidden" name="_token" value={csrf_token}/>
                            <label className="label-login">Username</label>
                            <div className="input-group form-group">
                                <FieldEmail name={"email"} placeholder={"email"}/>
                                <ErrorMessage name={"email"} component="div" className={"errorMessage"}/>
                            </div>
                            <label className="label-login">Password</label>
                            <div className="input-group form-group">
                                <FieldPassword name={"password"} placeholder={"password"}/>
                                <ErrorMessage name={"password"} component="div" className={"errorMessage"}/>
                            </div>
                            <div className="form-group">
                                <br />
                                <input type="submit" value="LOGIN" className="btn login_btn btn-primary form-control"/>
                            </div>
                        </Form>
                    )}
            />
    )
    }
}

const LoginFooter = function (props) {
    return (
        <div className="login-footer">
            {/*<p>Don't have an account? <a href={props.routeRegister}>Sign up now</a>.</p>*/}
            {/*<a href={props.routeForgotPassword}>Forgot Password?</a>*/}
        </div>
    )
}

class Login extends Component {

    constructor() {
        super();

        this.state = {
            routeRegister: "register",
            routeForgotPassword: "forgotPassword",
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
            <div className="form-login 123">
                <div>
                    <img src={logo} alt="" className="img-logo" />
                    <LoginForm />
                    <LoginFooter
                        routeRegister = {this.state.routeRegister}
                        routeForgotPassword = {this.state.routeForgotPassword}/>
                </div>
            </div>
        );
    }
}

export default Login;
