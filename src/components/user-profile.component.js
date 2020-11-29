import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button, Col } from 'react-bootstrap';
import '../css/Login.css';

var isProfileValidated = require('../common/util').isProfileValidated;
var isNumbered = require('../common/util').isNumbered;

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAddress2 = this.onChangeAddress2.bind(this);
        this.onChangeCity_State = this.onChangeCity_State.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            address: '',
            address2: '',
            city_state: '',
            zip: '',
            age: '',
            weight: '',
            height: '',
            isVerified: ''
        }
    }

    componentDidMount() {
        
        axios.get('http://localhost:5000/users/email/' + this.props.match.params.userID)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    address: response.data.address || '',
                    address2: response.data.address2 || '',
                    city_state: response.data.city_state || '',
                    zip: response.data.zip || '',
                    age: response.data.age || '',
                    height: response.data.height || '',
                    weight: response.data.weight || '',
                    isVerified: response.data.isVerified
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

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    onChangeAddress2(e) {
        this.setState({
            address2: e.target.value
        })
    }

    onChangeCity_State(e) {
        this.setState({
            city_state: e.target.value
        })
    }

    onChangeZip(e) {
        this.setState({
            zip: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangeWeight(e) {
        this.setState({
            weight: e.target.value
        })
    }

    onChangeHeight(e) {
        this.setState({
            height: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        if (isProfileValidated(this.state) && isNumbered(this.state)) {

            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                address2: this.state.address2,
                city_state: this.state.city_state,
                zip: this.state.zip,
                age: this.state.age,
                height: this.state.height,
                weight: this.state.weight
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
            password2: '',
            address: '',
            address2: '',
            city_state: '',
            zip: '',
            age: '',
            height: '',
            weight: ''
        })
    }


    render() {
        return (
            <div className="container">
                {(this.state.isVerified === false) &&

                    <p style={{ textAlign: "center" }} >Please verify your email by entering your OTP &nbsp;<a href={"/user/opt/"+this.state.email}>here.</a> </p>

                }
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

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" value={this.state.address} onChange={this.onChangeAddress} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" value={this.state.address2} onChange={this.onChangeAddress2} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City, State</Form.Label>
                            <Form.Control value={this.state.city_state} onChange={this.onChangeCity_State} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control value={this.state.zip} onChange={this.onChangeZip} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAge">
                            <Form.Label>Age (in years)</Form.Label>
                            <Form.Control value={this.state.age} onChange={this.onChangeAge} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridHeight">
                            <Form.Label>Height (in cms)</Form.Label>
                            <Form.Control value={this.state.height} onChange={this.onChangeHeight} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridWeight">
                            <Form.Label>Weight (in kgs)</Form.Label>
                            <Form.Control value={this.state.weight} onChange={this.onChangeWeight} />
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