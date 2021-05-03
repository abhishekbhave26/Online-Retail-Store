import React, { Component } from 'react';
import * as queryString from 'query-string';
import axios from 'axios';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import { FacebookLoginButton, GithubLoginButton, MicrosoftLoginButton, GoogleLoginButton } from "react-social-login-buttons";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onReset = () => {
        this.setState({
            email: '',
            password: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/authenticate/traditional', user)
            .then(res => {
                if (res.data.header === 'SUCCESS') {
                    localStorage.setItem("token", res.data.token);
                    window.location = '/list';
                }
                else if (res.data === 'User does not exist') {
                    alert("User with this email id does not exist. Please use one which exists or create a new account");
                }
                else {
                    alert("Please enter the correct password");
                }
            });
    }


    githubLogin() {
        const params = queryString.stringify({
            client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_GITHUB_REDIRECT_URL,
            scope: ['read:user', 'user:email'].join(' '), // space seperated string
            allow_signup: true,
        });

        const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
        window.location = githubLoginUrl;
    }

    facebookLogin() {
        const params = queryString.stringify({
            client_id: process.env.REACT_APP_FACEBOOK_ID,
            redirect_uri: process.env.REACT_APP_FACEBOOK_REDIRECT_URL,
            scope: ['email', 'user_friends'].join(' '), // space seperated string
            response_type: 'code',
            auth_type: 'rerequest',
            display: 'popup'
        });

        const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${params}`;
        window.location = facebookLoginUrl;
    }


    render() {
        return (
            <div className="LoginDiv">
                <div className="LoginMain">
                    <h2 style={{ textAlign: "center" }}>Login</h2>
                    <br/>
                    <form onSubmit={this.onSubmit} onReset={this.onReset}>
                        <div className="form-group">
                            <label>Email </label>
                            <input type="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />

                            <label>Password </label>
                            <input type="password"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <Link to="/user" className="signUp">Sign Up</Link> &nbsp; &nbsp;
                            <Link to="/password" className="forgotPassword">Forgot your password ?</Link>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary" /> &nbsp;
                            <input type="reset" value="Clear" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <br />
                <div className="LoginSocialButtons">
                    <GithubLoginButton onClick={this.githubLogin} />
                    <FacebookLoginButton onClick={this.facebookLogin} />
                    <GoogleLoginButton onClick={this.facebookLogin} />
                    <MicrosoftLoginButton onClick={this.facebookLogin} />
                </div>
            </div>
        )
    }
}