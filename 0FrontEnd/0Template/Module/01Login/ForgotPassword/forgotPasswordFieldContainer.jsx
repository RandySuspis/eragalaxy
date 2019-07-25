import React, { Component } from "react";
import "./forgotPasswordContainer.scss";
import {FieldPassword} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class ForgotPasswordFieldForm extends React.Component{
    constructor() {
        super();
        this.state = {
            url: "/user/resetpassword",
            initialValue: {
                email: email,
                token: token
            }

        };
    }

    fieldValidation = (values) => {
        let errors = {};
        let re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!values.new_password) { errors.new_password = "New Password is required" }
        if (!values.confirm_password) { errors.confirm_password = "Confirm Password is required" }
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
                        <Form action={this.state.url} method="post" id={"formReference"}>
                            <div className={"row"}>
                                <div className={"col-lg-6 col-md-8 col-sm-10 col-xs-12 offset-lg-3 offset-md-2 offset-sm-1"}>
                                    <input type="hidden" name="_token" value={csrf_token}/>
                                    <input type={"hidden"} name={"email"} value={email}/>
                                    <input type={"hidden"} name={"token"} value={token}/>

                                    <label className="label-login">New Password</label>
                                    <div className="input-group form-group">
                                        <FieldPassword name={"new_password"} placeholder={"********"}/>
                                        <ErrorMessage name={"new_password"} component="div" className={"errorMessage"}/>
                                    </div>
                                    <label className="label-login">Confirm Password</label>
                                    <div className="input-group form-group">
                                        <FieldPassword name={"confirm_password"} placeholder={"********"}/>
                                        <ErrorMessage name={"confirm_password"} component="div" className={"errorMessage"}/>
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

class ForgotPasswordField extends Component {

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
                    <ForgotPasswordFieldForm />
                </div>
            </div>
        );
    }
}

export default ForgotPasswordField;
