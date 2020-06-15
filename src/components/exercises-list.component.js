import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormControl, Form, Dropdown, Col } from 'react-bootstrap'

const Exercise = props => (
  <tr>
    <td>{props.exercise.email}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> | <Link to={"#"} onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Link>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      exercises: [],
      users: [],
      email: ''
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
    axios.get('http://localhost:5000/exercises/user/' + e.target.text)
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    })
  }

  handleSearch(e) {
    this.setState({
      exercises: this.state.exercises.filter(exer => exer.description.includes(e.target.value))
    })
  };


  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Logged Exercises</h2>
        <br />

        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg">
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
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}