import React, { Component } from 'react';

import './App.css';
// table component that displays all data

import Table from './components/Table'

class App extends Component {
  render() {
    return (
      <div className="App ">
      <div >
      <Table/>
      </div>
      </div>
    );
  }
}

export default App;
