import React, { Component } from 'react';

class Comment extends Component {
  constructor(props) {
      super();
      this.state = {
          editing: false,
          comment:''
      }
  }
  edit() {
    this.setState({
        editing: true
    });
  }  
  save() {
    let comment = this.refs.txtComment.value;
    console.log(comment);
    this.setState({
        editing: false,
        comment: comment
    }, function(){
        this.props.changeComment(comment);
    });
  } 

  renderNormal() {
      return (
        <div className="Comment">
        <div className="container">
            <h1>Hello There!</h1>
            <div className = "form-group">
                <div className = "form-control">{this.props.children}</div>
                <button onClick={this.edit.bind(this)} className="form-control btn btn-primary">Edit</button>    
            </div>
        </div>
      </div>
      );
  }

  renderForm() {
    return (
      <div className="Comment">
      <div className="container">
          <h1>Hello There!</h1>
          <div className = "form-group">
            <textarea defaultValue={this.props.children} ref="txtComment" className = "form-control"></textarea>
            <button onClick={this.save.bind(this)} className="form-control btn btn-primary">Save</button>
          </div>
      </div>
    </div>
    );
}

  render() {
    if(this.state.editing){
        return this.renderForm();
    } else {
        return this.renderNormal();
    }
  }
}

export default Comment;
