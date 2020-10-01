import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import NavBar from "./components/navbar.component";
import ProductsList from "./components/products-list.component";
import EditProduct from "./components/edit-product.component";
import CreateProduct from "./components/create-product.component";
import Register from "./components/register.component";
import ContactUs from "./components/contact-us.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import UserProfile from "./components/user-profile.component";
import OTP from "./components/otp.component";
import ForgotPassword from './components/forgot-password.component';

function App() {
  return (
    <Router>
      <div className="base-container">
      <NavBar />
      <br />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/edit/:id" exact component={EditProduct} />
      <Route path="/create" exact component={CreateProduct} />
      <Route path="/user" exact component={Register} />
      <Route path="/contact" exact component={ContactUs} />
      <Route path="/list" exact component={ProductsList} />
      <Route path="/user/:userID" exact component={UserProfile} />
      <Route path="/user/opt/:userID" exact component={OTP} />
      <Route path="/password" exact component={ForgotPassword} />
      
      </div>
    </Router>
  );
}

export default App;