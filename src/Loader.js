import React from 'react';
import gearLogo from './gear-logo.png';
import logo from './turing-main-logo.png';

const Loader = () => (
<div className='logo-images'>
  <img src={gearLogo} className="App-logo gear-logo" alt="logo" />
  <img src={logo} className="App-logo main-logo" alt="logo" />
</div>
)

export default Loader;
