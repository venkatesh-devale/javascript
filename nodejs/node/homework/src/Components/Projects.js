import React, { Component } from 'react';
import ProjectItem from './ProjectItem';



class Projects extends Component {
  

  render() {
    let projects;
    projects = this.props.projects.map(project => {
        return <ProjectItem key={project.id} project={project} />;
    });
    return (
      <div className="Projects">
        <div>
          <h3>Projects Details</h3>
            {projects}
        </div>

      </div>
    );
  }
}

export default Projects;
