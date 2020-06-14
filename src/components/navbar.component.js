import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown'

export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.home = this.home.bind(this);
    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
    this.contact = this.contact.bind(this);
    this.login = this.login.bind(this);

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


  componentDidMount() {
    
    if (Cookies.get('user') === undefined) {
      var expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5)
      Cookies.set('user', 'temp', { expires: expires, path:'/login' } )
      window.location = '/login'
    }
    this.setState({
      user:Cookies.get('user')
    })   
    
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" onClick={this.home} className="navbar-brand">Exercise Tracker</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/list" onClick={this.list} className="nav-link">Exercise Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" onClick={this.create} className="nav-link">Add Exercise Log</Link>
            </li>

            <li className="navbar-item">
              <Link to="/contact" onClick={this.contact} className="nav-link">Contact Us</Link>
            </li>

            <div className="login-logout-nav-bar">
              {(this.state.user === '' || this.state.user === 'temp') &&
                <li className="navbar-item">
                  <Link to="/login" onClick={this.login} className="nav-link">Sign Up / Login</Link>
                </li>
              }

              {(this.state.user !== 'temp' && this.state.user !== '') &&
                <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Hi, {(this.state.user)}
                </Dropdown.Toggle>
              
                <Dropdown.Menu>
                  <Dropdown.Item href={"/user/"+this.state.user}>My Profile</Dropdown.Item>
                  <Dropdown.Item href="/login" onClick={this.logout}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
                
              }
            </div>

          </ul>
        </div>
      </nav>
    )
  }
}