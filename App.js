import React, { Component,} from 'react';

import {
    BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Verse from './components/verse';

class App extends Component {

  render() {
    return (
        <Router>
            <div className="embed-responsive">
                <Route exact path="/"  component={Verse}/>
           </div>
        </Router>

    );
  }
}

export default App;
