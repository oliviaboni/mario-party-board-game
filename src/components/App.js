import React, { Component } from 'react';
import '../css/App.css';
import Main from './Main';
import TopNav from './TopNav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <Main />
      </div>
    );
  }
}

export default App;
