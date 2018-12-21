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
      error: ''
    };
  }

  fetchStaff = async (url) => {
    try {
      this.setState({ isLoading: true })
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      this.setState({ isLoading: false })
      const data = await response.json()
      const staff = await this.fetchBios(data.bio)
      this.setState({ staff })
    } catch (error) {
        this.setState({ error: error.message })
      }
  }

  fetchBios = (staffArray) => {
    this.setState({ isLoading: true })
    const unresolvedPromises = staffArray.map(async staffMember => {
      try {
        const response = await fetch(staffMember.info)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        this.setState({ isLoading: false })
        const data = await response.json()
        return { ...data, name: staffMember.name }
      } catch (error) {
        this.setState({ error: error.message })
        }
    })
    return Promise.all(unresolvedPromises);
  }

  componentDidMount() {
    const url = 'http://localhost:3001/api/frontend-staff'
    this.fetchStaff(url)
  }

  render() {
    const { staff, error, isLoading } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className='staff'>
            {
              error && error
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
