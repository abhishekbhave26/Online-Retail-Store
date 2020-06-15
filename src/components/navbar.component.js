import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.home = this.home.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.contact = this.contact.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      user: ''
    }
  }

  logout(e) {
    Cookies.remove('user')
    this.setState({
      user: ''
    })
    window.location = '/login'
  }

  home(e) {
    window.location = '/'
  }

  list(e) {
    window.location = '/list'
  }

  create(e) {
    window.location = '/create'
  }

  contact(e) {
    window.location = '/contact'
  }

  login(e) {
    window.location = '/login'
  }

  register(e){
    window.location = '/user'
  }


  componentDidMount() {

    if (Cookies.get('user') === undefined) {
      var expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5)
      Cookies.set('user', 'temp', { expires: expires, path: '/login' })
      Cookies.set('user', 'temp', { expires: expires, path: '/user' })
      window.location = '/login'
    }
    this.setState({
      user: Cookies.get('user')
    })

  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand onClick={this.home}>Exercise Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.list}>Exercise Log</Nav.Link>
            <Nav.Link onClick={this.create}>Add Exercise Log</Nav.Link>
            <Nav.Link onClick={this.contact}>Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {(this.state.user === '' || this.state.user === 'temp') &&
                <Nav className="mr-auto">
                <Nav.Link onClick={this.register}>Sign Up</Nav.Link>
                <Nav.Link onClick={this.login}>Login</Nav.Link>
                </Nav>
            }
            {(this.state.user !== 'temp' && this.state.user !== '') &&
            <NavDropdown title={"Hi, "+this.state.user} id="collasible-nav-dropdown">
              <NavDropdown.Item href={"/user/"+this.state.user}>My Account</NavDropdown.Item>
              <NavDropdown.Item onClick={this.contact}>Help</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">FAQ</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}