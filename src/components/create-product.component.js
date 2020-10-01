import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

var isProductValidated = require('../common/util').isProductValidated;

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeProductID = this.onChangeProductID.bind(this);
    this.onChangeInStock = this.onChangeInStock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      price: 0,
      category: '',
      weight: 0,
      productID: 0,
      inStock: true,
      users: []
    }
  }

  componentDidMount() {
    
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.email),
            email: response.data[0].email
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    })
  }

  onChangeProductID(e) {
    this.setState({
      productID: e.target.value
    })
  }

  onChangeInStock(e) {
    this.setState({
      inStock: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    if (isProductValidated(this.state)){
    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      weigth: this.state.weigth,
      productID: this.state.productID,
      inStock: this.state.inStock,
    }

    axios.post('http://localhost:5000/products/add', product)
      .then(res => console.log(res.data));

    window.location = '/list';
  }
 }

  render() {
    return (
      <div className="container">
      <h3 style={{ textAlign: "center" }}>Add New Product</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>User: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}>
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
          <label>Price (in dollars): </label>
          <input 
              type="text" 
              className="form-control"
              required
              value={this.state.price}
              onChange={this.onChangePrice}
              />
        </div>
        <div className="form-group">
          <label>Weight: </label>
          <input 
              type="text" 
              className="form-control"
              required
              value={this.state.weight}
              onChange={this.onChangeWeight}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add Product" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}