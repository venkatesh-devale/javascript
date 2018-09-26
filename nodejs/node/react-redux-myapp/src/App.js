import React, { Component } from 'react';
import UserList from './containers/UserList';
import UserDetail from './containers/user-detail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Username List:</h2>
        <UserList />
        <hr/>
        <h2>User Details:</h2>
        <UserDetail />
      </div>
    );
  }
}

export default App;
