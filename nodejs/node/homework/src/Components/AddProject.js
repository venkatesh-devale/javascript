import React, { Component } from 'react';
import uuid from 'uuid';


class AddProject extends Component {
  constructor() {
      super();
      this.state = {
          newProject: {}
      }
  }
   
  handleSubmit(event) {
    if(this.refs.projectName.value === '')
        alert('Project name cannot be empty');
    else {
        this.setState({
            newProject: {
                id: uuid.v4(),
                projectName: this.refs.projectName.value,
                projectDetails: this.refs.projectDetails.value,
                projectBudget: this.refs.projectBudget.value
            }
        }, function () {
            this.props.addProject(this.state.newProject);
        });
    }
    event.preventDefault();
  }

  render() {

    return (
      <div className="AddProject">
        <div>
          <h3>Add Project</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Name:</label>
            <input type='text' ref='projectName'/><br/><br/>
            <label>Details:</label>
            <input type='text' ref='projectDetails'/><br/><br/>
            <label>Range:</label>
            <input type='text' ref='projectBudget'/><br/><br/>
            <input type='submit' value='Add'/>
          </form>
        </div>

      </div>
    );
  }
}

export default AddProject;
