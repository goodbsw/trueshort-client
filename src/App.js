import React, { Component } from 'react';
import Search from './components/Search/Search';
import Info from './components/Info/Info';
import './App.css';
import './components/Info/Info.css';
import './components/Chart/Chart.css';
import './components/Detail/Detail.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      security: null
    }

    this.changeSecurity = this.changeSecurity.bind(this);
}

changeSecurity(security) {
  this.setState ({
    security: security
  });
}

  render() {

    return (
      <div className="App">
      <h1>TRUE SHORT</h1>
        <Search setSecurity={this.changeSecurity}/>
        <Info selectedSecurity={this.state.security}/>
      </div>
    );
  }
}

export default App;
