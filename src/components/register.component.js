import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button, Col } from 'react-bootstrap';
import '../css/Login.css';

var isProfileValidated = require('../common/util').isProfileValidated;

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);

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

  onReset(e) {
    e.preventDefault();

    this.setState({
      name: '',
      email: '',
      password: '',
      password2: ''
    })

  }

  onSubmit(e) {
    e.preventDefault();

    if (isProfileValidated(this.state)) {

      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }

      axios.get('http://localhost:5000/users/email/' + this.state.email)
        .then(response => {
          if (response.data !== null) {
            alert('User with this email id already exists. Please login or try forgot password.')
          }
          else {
            axios.post('http://localhost:5000/users/add', user)
              .then(res => {
                if (res.data.header === 'User added!') {
                  localStorage.setItem("token", res.data.token);
                  window.location = '/list';
                }
              });

          }
        })
        .catch(function (error) {
          console.log(error);
        })

      this.setState({
        name: '',
        email: '',
        password: '',
        password2: ''
      })

    }
  }

  render() {
    return (
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <br />

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="" placeholder="Name" required value={this.state.name} onChange={this.onChangeName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required value={this.state.email} onChange={this.onChangeEmail} />
            </Form.Group>

          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required value={this.state.password} onChange={this.onChangePassword} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword2">
              <Form.Label>Enter Password Again</Form.Label>
              <Form.Control type="password" placeholder="Password" required value={this.state.password2} onChange={this.onChangePassword2} />
            </Form.Group>

          </Form.Row>

          <div className="register">
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              Submit
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button variant="primary" type="reset" onClick={this.onReset}>
              Reset
                </Button>
          </div>
        </Form>
      </div>

    )
  }
}