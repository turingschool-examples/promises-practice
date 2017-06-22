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
    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className='staff'>
            {
              this.state.staff.length === 0 ?
              <Loader /> :
              <StaffList array={this.state.staff} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
