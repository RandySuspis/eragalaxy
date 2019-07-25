import React, { Component } from "react";
import "./forgotPasswordContainer.scss";
import {FieldEmail} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class ForgotPasswordForm extends React.Component{
    constructor() {
        super();
        this.state = {
            url: "/forgotPassword",
            initialValue: {
            }

        };
    }

    fieldValidation = (values) => {
        let errors = {};
        let re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
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
                            <div className={"row"}>
                                <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 offset-lg-3 offset-md-2 offset-sm-1"}>
                                    <p align="center">Enter your registered e-mail or phone number. We'll send you a verification code to reset your password</p>
                                    <input type="hidden" name="_token" value={csrf_token}/>
                                    <label className="label-login">E-mail</label>
                                    <div className="input-group form-group">
                                        <FieldEmail name={"email"} placeholder={"E-mail"}/>
                                        <ErrorMessage name={"email"} component="div" className={"errorMessage"}/>
                                    </div>

                                    <div className="form-group">
                                        <br />
                                        <input type="submit" value="RESET PASSWORD" className="btn default_btn btn-primary form-control"/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
            />
        )
    }
}

class ForgotPassword extends Component {

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
            <div className="form-forgot-password">
                <div>
                    <ForgotPasswordForm />
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
