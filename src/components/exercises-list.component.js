import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
    this.state = {
      exercises: [],
      users: [],
      username: ''
    }
}

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        const user = {
          username: '-- ALL USERS --'
        }
        var newList = [user].concat(response.data);
        if (newList.length > 1) {
          this.setState({
            users: newList.map(user => user.username),
            username: newList[0].username,
          })
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    
    this.setState({
      username: e.target.value
    })
    axios.get('http://localhost:5000/exercises/username/'+e.target.value)
    .then(response => {
      this.setState({ exercises: response.data})
    })
    .catch((error) => {
      console.log(error);
    })
    
}

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  handleSearch(e)  {
    this.setState({
      exercises: this.state.exercises.filter(exer => exer.description.includes(e.target.value))
    })
  };


  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        
        <div className="form-group"> 
          <label>Filter by User: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
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

        <div className="input-group">
        <input
            type="text"
            value={this.state.search}
            onChange={this.handleSearch}
            className="form-control"
          />
        </div>
        <br/>
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
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}