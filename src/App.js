import React, { Component } from 'react';
import Loader from './Loader.js';
import './App.css';
import StaffList from './StaffList.js';
import { connect } from 'react-redux';
import { fetchStaff } from './thunks/fetchStaff';

class App extends Component {
  
  componentDidMount() {
    const url = 'http://localhost:3001/api/frontend-staff'
    this.props.fetchStaff(url)
  }

  render() {
    const { staff, hasErrored, isLoading } = this.props

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

const mapStateToProps = (state) => ({
  staff: state.staff,
  isLoading: state.isLoading,
  hasErrored: state.hasErrored
})

const mapDispatchToProps = (dispatch) => ({
  fetchStaff: (url) => dispatch(fetchStaff(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
