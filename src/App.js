import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import NavBar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Register from "./components/register.component";
import ContactUs from "./components/contact-us.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import UserProfile from "./components/user-profile.component";

function App() {
  return (
    <Router>
      <div className="container">
      <NavBar />
      <br />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/edit/:id" exact component={EditExercise} />
      <Route path="/create" exact component={CreateExercise} />
      <Route path="/user" exact component={Register} />
      <Route path="/contact" exact component={ContactUs} />
      <Route path="/list" exact component={ExercisesList} />
      <Route path="/user/:userID" exact component={UserProfile} />
      
      </div>
    </Router>
  );
}

export default App;