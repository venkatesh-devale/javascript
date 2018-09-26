import React, { Component } from 'react';
import Projects from './Components/Projects';
import './App.css';
import AddProject from './Components/AddProject';
import Users from './Components/Users.js';
import uuid from 'uuid';
import $ from 'jquery';
import Venkatesh from './Components/Venkatesh';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      users: [],
      name:''
    }
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development'
        }
      ]
    });
  }

  getUsers() {
    $.ajax({
      url:'https://jsonplaceholder.typicode.com/users',
      dateType: 'json',
      cache: false,
      success: function(data) {
        this.setState({users: data}, function() {
          console.log(this.state);
        });
      }.bind(this), 
      error: function(xhr, status, err) {
        console.log(err);
      }

    });
  }

  componentWillMount()  {
    this.getProjects();
    this.getUsers();
  }

  componentDidMount() {
    
  }

  changeName(name) {
    this.setState({
      name: name
    });
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects : projects
    });
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({
      projects : projects
    });
  }

  render() {
    return (
      <div className="App">
       <Venkatesh changeName={this.changeName.bind(this)}/>
       <AddProject addProject={this.handleAddProject.bind(this)}/>
       <Projects 
       projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
       <Users users={this.state.users}/>
      </div>
    );
  }
}

export default App;
