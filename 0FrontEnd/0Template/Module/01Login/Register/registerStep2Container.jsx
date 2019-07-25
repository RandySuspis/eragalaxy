import React, { Component } from "react";
import "./registerContainer.scss";
import {FieldText, FieldEmail, FieldPassword} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class RegisterStep2Container extends React.Component{
    constructor() {
        super();
        this.state = {
            urlRegister: "/register/3",
            initialValue: {
                email: '',
                first_name: '',
                last_name: '',
                registerType: ''
            }

        };
    }

    componentWillMount() {
        this.setState({
            initialValue: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                registerType: registerType
            }
        });
    }

    fieldValidation = (values) => {
        let errors = {};
        let re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
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
                            <Form action={this.state.urlRegister} method="post" id={"formReference"}>
                                <input type="hidden" name="_token" value={csrf_token}/>
                                <input type="hidden" name="registerType" value={registerType}/>

                                <label className="label-login">First Name</label>
                                <div className="input-group form-group">
                                    <FieldText name={"first_name"} placeholder={"First Name"}/>
                                    <ErrorMessage name={"first_name"} component="div" className={"errorMessage"}/>
                                </div>

                                <label className="label-login">Last Name</label>
                                <div className="input-group form-group">
                                    <FieldText name={"last_name"} placeholder={"Last Name"}/>
                                    <ErrorMessage name={"last_name"} component="div" className={"errorMessage"}/>
                                </div>


                                <label className="label-login">E-mail</label>
                                <div className="input-group form-group">
                                    <FieldEmail name={"email"} placeholder={"E-mail"}/>
                                    <ErrorMessage name={"email"} component="div" className={"errorMessage"}/>
                                </div>

                                <label className="label-login">Password</label>
                                <div className="input-group form-group">
                                    <FieldPassword name={"password"} placeholder={"********"}/>
                                    <ErrorMessage name={"password"} component="div" className={"errorMessage"}/>
                                </div>

                                <label className="label-login">Confirm Password</label>
                                <div className="input-group form-group">
                                    <FieldPassword name={"confirm_password"} placeholder={"********"}/>
                                    <ErrorMessage name={"confirm_password"} component="div" className={"errorMessage"}/>
                                </div>

                                <div className="form-group">
                                    <br />
                                    <input type="submit" value="CONTINUE" className="btn register_btn btn-primary form-control"/>
                                </div>
                            </Form>
                        )}
                />
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

class RegisterStep2 extends Component {

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
                    <RegisterStep2Container />
                    <RegisterFooter
                        routeLogin = {this.state.routeLogin}/>
                </div>
            </div>
        );
    }
}

export default RegisterStep2;
