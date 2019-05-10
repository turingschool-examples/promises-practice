import React, { Component } from 'react';
import Loader from './Loader.js';
import './App.css';
import StaffList from './StaffList.js';
import { fetchStaff } from './thunks/fetchStaff'
import { connect } from 'react-redux'

class App extends Component {
  
  componentDidMount() {
    const url = 'http://localhost:3001/api/frontend-staff'
    this.props.fetchStaff(url)
  }

  render() {
    const { staff, staffError, staffIsLoading } = this.props

    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className='staff'>
            {
              staffError && staffError
            }
            {
              staffIsLoading ? <Loader /> : <StaffList staff={staff} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({staff, staffIsLoading, staffError}) => ({
  staff,
  staffIsLoading,
  staffError
})

const mapDispatchToProps = (dispatch) => ({
  fetchStaff: (url) => dispatch(fetchStaff(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
