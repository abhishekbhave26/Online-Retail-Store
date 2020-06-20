import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import '../css/Login.css';

export default class OTP extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeOTP = this.onChangeOTP.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resubmitEmail = this.resubmitEmail.bind(this);

        this.state = {
            email: '',
            isVerified: '',
            otp: ''
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


    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            otp: this.state.otp
        }

        axios.post('http://localhost:5000/users/otp/' + this.props.match.params.userID, user)
            .then(res => {
                if (res.status === 200 && res.data === 'User updated') {
                    alert("Your account is now verified");
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

        axios.post('http://localhost:5000/users/otp/user/' + this.props.match.params.userID, user)
            .then(res => {
                if (res.status === 200 && res.data === 'New email otp sent') {
                    alert("New email has been sent");
                }
            });

        this.setState({
            otp: '',
            email: ''
        })
    }


    render() {
        return (
            <div className="LoginDiv">
                <div className="LoginMain">

                    <h2 style={{ textAlign: "center" }}>Enter your OTP</h2>
                    <br />
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
            </div>

        )
    }
}