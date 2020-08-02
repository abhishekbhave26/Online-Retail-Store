import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button, Col } from 'react-bootstrap';
import '../css/Login.css';

var isProfileValidated = require('../common/util').isProfileValidated;

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeOTP = this.onChangeOTP.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.resubmitEmail = this.resubmitEmail.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onFinalSubmit = this.onFinalSubmit.bind(this);

        this.state = {
            email: '',
            isVerified: '',
            otp: '',
            isEmail: false,
            isOTP: false,
            password: '',
            password2: ''
        }
    }



    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeOTP(e) {
        this.setState({
            otp: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        })
    }

    onSubmitEmail(e) {
        e.preventDefault();

        axios.get('http://localhost:5000/users/email/' + this.state.email)
            .then(response => {
                if (response.data !== null) {
                    this.setState({
                        email: response.data.email
                    })
                    const user = {
                        email: this.state.email,
                    }
            
                    axios.post('http://localhost:5000/users/otp/user/' + this.state.email, user)
                        .then(res => {
                            if (res.status === 200 && res.data === 'New email otp sent') {
                                this.setState({
                                    isEmail: true
                                })
                            }
                        });

                }
                else {
                    alert('User does not exist')
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            otp: this.state.otp
        }

        axios.post('http://localhost:5000/users/otp/' + this.state.email, user)
            .then(res => {
                if (res.status === 200 && res.data === 'User updated') {
                   this.setState({
                       isOTP : true
                   })
                }
                else {
                    alert("Please try with a new OTP");
                }
            });
    }

    resubmitEmail(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            otp: this.state.otp
        }

        axios.post('http://localhost:5000/users/otp/user/' + this.state.email, user)
            .then(res => {
                if (res.status === 200 && res.data === 'New email otp sent') {
                    alert("New email has been sent");
                }
            });
    }


    onFinalSubmit(e){
        e.preventDefault();

        if (isProfileValidated(this.state)) {
            const user = {
                email: this.state.email,
                password: this.state.password
            }

            axios.post('http://localhost:5000/users/update/password/' + this.state.email, user)
                .then(res => {
                    if (res.status === 200) {
                        alert("Profile successfully updated");
                    }
                    else {
                        alert("Problem updating your profile. Please try again");
                    }
                });
        }

    }


    render() {
        return (
            <div className="LoginDiv">
                <div className="LoginMain">

                    <h3 style={{ textAlign: "center" }}>Enter your registered email to receive OTP</h3>
                    <br />
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Control type="email" placeholder="Email ID" required value={this.state.email} onChange={this.onChangeEmail} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Button variant="primary" type="submit" onClick={this.onSubmitEmail}>
                                    Submit
                                </Button>
                            </Form.Group>

                        </Form.Row>
                        
                    </Form>

                    {(this.state.isEmail === true) &&
                    <div>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Enter your OTP</h3>
                    <Form>
                        <Form.Row>
                            <Form.Control type="number" placeholder="OTP" required value={this.state.otp} onChange={this.onChangeOTP} />
                        </Form.Row>
                        <br />
                        <div className="register">
                            <Button variant="primary" type="submit" onClick={this.onSubmit}>
                                Submit
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button variant="primary" type="submit" onClick={this.resubmitEmail}>
                                Resend OTP via Email
                        </Button>
                        </div>
                    </Form>
                    </div>
                    }

                    {(this.state.isOTP === true) &&
                    <div>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Set your new password</h3>
                    <Form>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Control type="password" placeholder="Password" required value={this.state.password} onChange={this.onChangePassword} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Control type="password" placeholder="Password" required value={this.state.password2} onChange={this.onChangePassword2} />
                        </Form.Group>
                        </Form.Row>
                        <br />
                        <div className="register">
                            <Button variant="primary" type="submit" onClick={this.onFinalSubmit}>
                                Submit
                        </Button>
                        </div>
                    </Form>
                    </div>
                    }
                </div>
            </div>

        )
    }
}