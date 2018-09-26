import React, { Component } from 'react';



class ProjectItem extends Component {
  

  render() {

    return (
      <div className="ProjectItem">
        <div>
          <li>{this.props.project.projectName} - {this.props.project.projectBudget}</li>
        </div>

      </div>
    );
  }
}

export default ProjectItem;
