import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import './App.css';

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Main />
    </div>
  </div> 
)

export default App;
