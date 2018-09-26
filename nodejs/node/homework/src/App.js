import React, { Component } from 'react';
import AddProject from './Components/AddProject'
import Projects from './Components/Projects'

import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      projects:[]
    }
  }

  handleAddProject(project) {
    console.log(project);
    let projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects: projects
    }
    );
  }

  render() {

    return (
      <div className="App">
       <AddProject addProject={this.handleAddProject.bind(this)}/>
       <Projects projects={this.state.projects} />
      </div>
      
    );
  }
}

export default App;
