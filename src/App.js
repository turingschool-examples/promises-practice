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

  // componentDidMount() {
  //   // $.get('http://localhost:3001/api/frontend-staff', (info) => {
  //   //   info.bio.forEach((i) => {
  //   //     $.get(i.info, (bio) => {
  //   //       Object.assign(i, bio)
  //   //       this.setState({ staff: info.bio })
  //   //     })
  //   //   })
  //   // })
  //
  //   const promise = new Promise((resolve, reject) => {
  //     if (this.state.staff.length === 0) { reject('') }
  //     resolve(this.state.staff)
  //   })
  //
  //   promise.then((i) => console.log(i))
  // }
  componentDidMount() {
    fetch('http://localhost:3001/api/frontend-staff')
    .then((res) => res.json())
    .then((info) => {
      const promises = info.bio.map((i) => fetch(i.info).then((res) => res.json()))
      return Promise.all(promises).then((members) => members.map((person, i) => Object.assign(info.bio[i], person)))
    }).then((people) => this.setState({ staff: people }))
    .catch((error) => console.log(error))
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
