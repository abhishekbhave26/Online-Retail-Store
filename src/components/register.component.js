import React, { Component } from 'react';
import axios from 'axios';

var isValidated = require('../common/util').isValidated;

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
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

  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    })
  }

  

  onSubmit(e) {
    e.preventDefault();

    if(isValidated(this.state)){
    
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }

      axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

      this.setState({
        name: '',
        email: '',
        password: ''
      })
    
    window.location = '/list';
    }
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />

            <label>Email Address: </label>
            <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />

            <label>Password: </label>
            <input type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />

            <label>Enter Password Again: </label>
            <input type="password"
              required
              className="form-control"
              value={this.state.password2}
              onChange={this.onChangePassword2}
            />

          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}