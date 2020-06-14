import React, { Component } from 'react';
import axios from 'axios';
var isValidated = require('../common/util').isValidated;

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
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
        
        if(isValidated(this.state)){

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


    render() {
        return (
            <div>
                <h3>Update user profile</h3>
                <br />
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
                            readOnly={true}
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