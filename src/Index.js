import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Vote from './components/Vote';
import Results from './components/Results';
import Admin from './components/Admin';

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint

import Styles from './styles/main.styl'; // eslint-disable-line no-unused-vars

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Vote}/>
      <Route path="/vote" component={Vote}/>
      <Route path="/results" component={Results}/>
      <Route path="/admin" component={Admin}/>
    </Route>
  </Router>
  , document.getElementById('root')
);
