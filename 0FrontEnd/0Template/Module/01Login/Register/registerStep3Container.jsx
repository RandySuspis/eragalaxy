import React, { Component } from "react";
import "./registerContainer.scss";
import {FieldText, FieldSelectOption} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class RegisterStep3Container extends React.Component{
    constructor() {
        super();
        this.state = {
            urlRegister: "/register/post",
            initialValue: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                registerType: registerType,
                gender: gender,
                birthday : birthday,
                phone: phone,
                city: city
            },
            genderValue: [{
                "key" : "pria",
                "value" : "Pria"
            }, {
                "key" : "wanita",
                "value" : "Wanita"
            }]

        };
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

                            <input type="hidden" name="first_name" value={first_name}/>
                            <input type="hidden" name="last_name" value={last_name}/>
                            <input type="hidden" name="email" value={email}/>
                            <input type="hidden" name="password" value={password}/>
                            <input type="hidden" name="registerType" value={registerType}/>


                            <label className="label-login">Gender</label>
                            <div className="input-group form-group">
                                <FieldSelectOption name={"gender"} placeholder={"Gender"} options={this.state.genderValue}/>
                                <ErrorMessage name={"gender"} component="div" className={"errorMessage"}/>
                            </div>

                            <label className="label-login">Birth Date</label>
                            <div className="input-group form-group">
                                <FieldText name={"birthday"} placeholder={"birthday"}/>
                                <ErrorMessage name={"birthday"} component="div" className={"errorMessage"}/>
                            </div>

                            <label className="label-login">Phone</label>
                            <div className="input-group form-group">
                                <FieldText name={"phone"} placeholder={"phone"}/>
                                <ErrorMessage name={"phone"} component="div" className={"errorMessage"}/>
                            </div>

                            <label className="label-login">City</label>
                            <div className="input-group form-group">
                                <FieldText name={"city"} placeholder={"city"}/>
                                <ErrorMessage name={"city"} component="div" className={"errorMessage"}/>
                            </div>

                            <div className="form-group">
                                <br />
                                <input type="submit" value="REGISTER" className="btn register_btn btn-primary form-control"/>
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

class RegisterStep3 extends Component {

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
                    <RegisterStep3Container />
                    <RegisterFooter
                        routeLogin = {this.state.routeLogin}/>
                </div>
            </div>
        );
    }
}

export default RegisterStep3;
