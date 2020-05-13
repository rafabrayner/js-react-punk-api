import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BeersList from './containers/BeersList';
import BeerDetail from './containers/BeerDetail';
import Wrapper from './components/wrapper';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Wrapper>
          <Route exact path='/' component={BeersList} />
          <Route exact path='/beer/:beerId' component={BeerDetail} />
        </Wrapper>
      </Switch>
    </Router>
  );
}

export default App;
