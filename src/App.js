import React, { Component } from 'react';
import Loader from './Loader.js';
import './App.css';
import StaffList from './StaffList.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      staff: [],
      isLoading: false,
      hasErrored: false
    };
  }

  fetchStaff = (url) => {
    this.setState({ isLoading: true })
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        this.setState({ isLoading: false })
        return response
      })
      .then(response => response.json())
      .then(data => this.fetchBios(data.bio))
      .then(staff => this.setState({ staff }))
      .catch(() => this.setState({ hasErrored: true }))
  }

  fetchBios = (staffArray) => {
    this.setState({ isLoading: true })
    const unresolvedPromises = staffArray.map(staffMember => {
      return fetch(staffMember.info)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        this.setState({ isLoading: false })
        return response
      })
      .then(response => response.json())
      .then(data => ({...data, name: staffMember.name}))
      .catch(() => this.setState({ hasErrored: true }))
    })
    return Promise.all(unresolvedPromises);
  }

  componentDidMount() {
    const url = 'http://localhost:3001/api/frontend-staff'
    this.fetchStaff(url)
  }

  render() {
    const { staff, hasErrored, isLoading } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className='staff'>
            {
              hasErrored ? <p>Sorry! There was an error loading the page.</p> : ''
            }
            {
              isLoading ? <Loader /> : <StaffList staff={staff} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
