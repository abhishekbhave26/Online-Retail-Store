import React, { Component } from 'react';
import axios from 'axios';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      email: ''
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

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  
  onSubmit(e) {
    e.preventDefault();

    const contact = {
      name: this.state.name,
      description: this.state.description,
      email: this.state.email
    }

    console.log("Thank you for your details, our team members will reach out to you");

    axios.post('http://localhost:5000/contact/add', contact)
      .then(res => console.log(res.data));

    window.location = '/list';
  }

  render() {
    return (
      <div className="container">
      <h3 style={{ textAlign: "center" }}>Submit Contact Request</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        
        <div className="form-group">
          <label>Email: </label>
          <input 
              type="email" 
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
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