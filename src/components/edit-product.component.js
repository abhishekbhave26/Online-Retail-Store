import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

var isProductValidated = require('../common/util').isProductValidated;

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/products/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.email),
          })
        }
      })
      .catch((error) => {
        console.log(error);
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

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (isProductValidated(this.state)){
    const product = {
      email: this.state.email,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    axios.post('http://localhost:5000/products/update/' + this.props.match.params.id, product)
      .then(res => console.log(res.data));

    window.location = '/list';
  }
  }

  render() {
    return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>Edit Product Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>User: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              required
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
            required
              selected={this.state.date}
              onChange={this.onChangeDate}
              maxDate={new Date()}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit Changes" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}