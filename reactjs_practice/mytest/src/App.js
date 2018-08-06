import React, { Component } from 'react';
import './App.css';
import Comment from "./Components/Comment";

class App extends Component {
  constructor(){
    super();
    this.state = {
      comment:"Hi this is venkatesh"
    }
  }

  handleChangeInComment(comment) {
    this.setState({
      comment: comment
    });
  }

  render() {
    return (
      <div className="App">
        <Comment changeComment={this.handleChangeInComment.bind(this)}>{this.state.comment}</Comment>
      </div>
    );
  }
}

export default App;
