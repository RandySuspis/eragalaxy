import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./signupContainer.scss";
import logo from '~Assets/img/template/logo.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldText, FieldPassword, FieldEmail} from "../../../Components/03Form/FieldType.jsx"


class SignUpForm extends React.Component {

    constructor() {
        super();
        this.state = {
            urlSignup: "/register",
            initialValue: {
                email: "",
                password: "",
                confirmPassword: "",
                firstname: "",
                lastname: "",
            }

        };
    }

    fieldValidation = (values) => {
        let errors = {};
        let re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!values.email) { errors.email = "Username is required" }
        if (values.email && !re.test(values.email)) { errors.email = "Please enter a valid email" }
        if (!values.password) { errors.password = "Password is required" }
        if (!values.firstname) { errors.firstname = "First Name is required" }
        if (values.confirmPassword!=values.password) { errors.confirmPassword = "Password did not match" }

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
                        <Form action={this.state.urlSignup} method="POST" id={"formReference"}>
                            <input type="hidden" name="_token" value={csrf_token}/>
                            <label className="label-signup">Email</label>
                            <div className="input-group form-group">
                                <FieldEmail name={"email"} placeholder={"email"}/>
                                <ErrorMessage name={"email"} component="div" className={"errorMessage"}/>
                            </div>
                            <label className="label-signup">Password</label>
                            <div className="input-group form-group">
                                <FieldPassword name={"password"} placeholder={"password"}/>
                                <ErrorMessage name={"password"} component="div" className={"errorMessage"}/>
                            </div>
                            <label className="label-signup">Confirm Password</label>
                            <div className="input-group form-group">
                                <FieldPassword name={"confirmPassword"} placeholder={"confirm password"}/>
                                <ErrorMessage name={"confirmPassword"} component="div" className={"errorMessage"}/>
                            </div>
                            <label className="label-signup">First Name</label>
                            <div className="input-group form-group">
                                <FieldText name={"firstname"} placeholder={"first name"}/>
                                <ErrorMessage name={"firstname"} component="div" className={"errorMessage"}/>
                            </div>
                            <label className="label-signup">Last Name</label>
                            <div className="input-group form-group">
                                <FieldText name={"lastname"} placeholder={"last name"}/>
                                <ErrorMessage name={"lastname"} component="div" className={"errorMessage"}/>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Register"
                                     className="btn float-right signup_btn btn-primary form-control"/>
                            </div>
                        </Form>
                    )}
            />
        )
    }
}

const SignnupFooter = function (props) {
    return (
        <div className="signup-footer">
            <p>Already have an account? <a href={props.routeLogin}>Login now</a>.</p>
        </div>
    )
}

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            routeLogin: "login",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { seo_title } = this.state;
        return (
            <div className="col-sm-8 form-signup">
                <div>
                    <img src={logo} alt="" className="img-logo"/>
                    <SignUpForm />
                    <SignnupFooter
                        routeLogin = {this.state.routeLogin}/>
                </div>
            </div>
        );
    }
}

export default SignUp;

