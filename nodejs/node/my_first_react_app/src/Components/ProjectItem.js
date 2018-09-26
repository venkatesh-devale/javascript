import React, { Component } from 'react';

class ProjectItem extends Component {

  deleteProject(id) {
    this.props.onDelete(id);
  }  

  render() {
      
    return (
      <li className='Project'>
        {this.props.project.title} - {this.props.project.category} <button onClick={this.deleteProject.bind(this, this.props.project.id)}> X </button>
      </li>

    );
  }
}

export default ProjectItem;
