import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button, Col } from 'react-bootstrap';
import '../css/Login.css';

var isValidated = require('../common/util').isValidated;

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
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

    componentDidMount() {

        axios.get('http://localhost:5000/users/email/' + this.props.match.params.userID)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
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

        if (isValidated(this.state)) {

            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('http://localhost:5000/users/update/' + this.props.match.params.userID, user)
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

    onReset(e) {
        e.preventDefault();

        this.setState({
            name: '',
            email: '',
            password: '',
            password2: ''
        })
    }


    render() {
        return (
            <div >
                <h2 style={{ textAlign: "center" }}>Update your profile</h2>
                <br />

                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="" placeholder="Name" required value={this.state.name} onChange={this.onChangeName} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required value={this.state.email} readOnly={true} />
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

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <div class="register">
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