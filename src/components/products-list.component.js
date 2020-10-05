import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl, Form, Dropdown, Col } from 'react-bootstrap';
import '../css/Login.css';

const Product = props => (
  <tr>
    <td>{props.product.email}</td>
    <td>{props.product.description}</td>
    <td>{props.product.duration}</td>
    <td>{props.product.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.product._id}>Edit</Link> | <Link to={"#"} onClick={() => { props.deleteProduct(props.product._id) }}>Delete</Link>
    </td>
  </tr>
)

export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      products: [],
      users: [],
      email: ''
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/products/')
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch((error) => {
        console.log(error);
      })



    axios.get('http://localhost:5000/users/')
      .then(response => {
        const user = {
          email: '-- ALL USERS --'
        }
        var newList = [user].concat(response.data);
        if (newList.length > 1) {
          this.setState({
            users: newList.map(user => user.email),
            email: newList[0].email,
          })
        }

      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeEmail(e) {

    this.setState({
      email: e.target.text
    })
    axios.get('http://localhost:5000/products/user/' + e.target.text)
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      products: this.state.products.filter(el => el._id !== id)
    })
  }

  productList() {
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id} />;
    })
  }

  handleSearch(e) {
    this.setState({
      products: this.state.products.filter(exer => exer.description.includes(e.target.value))
    })
  };


  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Logged Products</h2>
        <br />
      <div className="container">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="md">
                  {this.state.email}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    this.state.users.map(user => (
                      <Dropdown.Item key={user} value={user} onClick={this.onChangeEmail}>{user}</Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridName">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={this.handleSearch} />
            </Form.Group>
          </Form.Row>

        </Form>

    
        <br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.productList()}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}