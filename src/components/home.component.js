import React, { Component } from 'react';
import * as queryString from 'query-string';

export default class Home extends Component {


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

facebookLogin(){
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

normalLogin(){
    
}


 render() {
    return (
    <div>
        <a href="#" onClick={this.normalLogin}>
            Login with Exercise Tracker Credentials
        </a>
        <br/>
        <a href="#" onClick={this.githubLogin}>
            Login with GitHub
        </a>
        <br/>
        <a href="#" onClick={this.facebookLogin}>
            Login with Facebook
        </a>
    </div>
    )
  }
}