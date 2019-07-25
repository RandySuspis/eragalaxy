import React, { Component } from "react";
import "./editProfileContainer.scss";
import {FieldText, FieldSelectOption, FieldImageUpload} from "../../../Components/03Form/FieldType.jsx";
import {ErrorMessage, Form, Formik} from "formik";

class EditProfileForm extends React.Component{
    constructor() {
        super();

        var photourl = "user.png";
        if (photo != '') photourl = photo;

        console.log(photo);

        this.state = {
            url: "/editProfile",
            initialValue: {
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                photo: photourl,
                date_of_birth: date_of_birth,
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
                        <Form action={this.state.url} method="post" id={"formReference"} encType={"multipart/form-data"}>
                            <div className={"row"}>
                                <div className={"col-lg-8 col-md-10 col-sm-12 offset-lg-2 offset-md-1"}>
                                    <input type="hidden" name="_token" value={csrf_token}/>

                                    <div className={"image_upload"}>
                                        <FieldImageUpload name={"image"} placeholder={""} defaultData={this.state.initialValue.photo} />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="label-login">First Name</label>
                                            <div className="input-group form-group">
                                                <FieldText name={"first_name"} placeholder={"First Name"}/>
                                                <ErrorMessage name={"first_name"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="label-login">Last Name</label>
                                            <div className="input-group form-group">
                                                <FieldText name={"last_name"} placeholder={"Last Name"}/>
                                                <ErrorMessage name={"last_name"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="label-login">Gender</label>
                                            <div className="input-group form-group">
                                                <FieldSelectOption name={"gender"} placeholder={"Gender"} options={this.state.genderValue}/>
                                                <ErrorMessage name={"gender"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="label-login">Date of Birth</label>
                                            <div className="input-group form-group">
                                                <FieldText name={"date_of_birth"} placeholder={"Date of Birth"}/>
                                                <ErrorMessage name={"date_of_birth"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="label-login">Phone</label>
                                            <div className="input-group form-group">
                                                <FieldText name={"phone"} placeholder={"phone"}/>
                                                <ErrorMessage name={"phone"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="label-login">City</label>
                                            <div className="input-group form-group">
                                                <FieldText name={"city"} placeholder={"City"}/>
                                                <ErrorMessage name={"city"} component="div" className={"errorMessage"}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <br />
                                        <input type="submit" value="EDIT PROFILE" className="btn editprofile_btn btn-primary form-control"/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
            />
        )
    }
}

class EditProfile extends Component {

    constructor() {
        super();

        this.state = {
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
            <div className="form-edit-profile">
                <div>
                    <EditProfileForm />
                </div>
            </div>
        );
    }
}

export default EditProfile;
