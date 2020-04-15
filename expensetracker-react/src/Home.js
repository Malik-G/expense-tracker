import React, { Component } from 'react';
import NavBar from './NavBar';

class Home extends Component {
  state = {  }
  render() { 
    return ( <>
      <h2 style={{display: 'flex', alignItems:'center', justifyContent: 'center', height: '100vh'}}>Welcome to $ta$h</h2>
    </>
    );
  }
}
 
export default Home;