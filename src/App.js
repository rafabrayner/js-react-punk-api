import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BeersList from './containers/BeersList';
import BeerDetail from './containers/BeerDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={BeersList} />
        <Route exact path='/beer/:beerId' component={BeerDetail} />
      </Switch>
    </Router>
  );
}

export default App;
