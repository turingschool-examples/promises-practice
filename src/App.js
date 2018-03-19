import React, { Component } from 'react';
import Loader from './Loader.js';
import './App.css';
import $ from 'jquery';
import StaffList from './StaffList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      staff: []
    };
  }

  render() {
    const { staff } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className='staff'>
            {
              !staff.length ?
              <Loader /> :
              <StaffList staff={staff} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
