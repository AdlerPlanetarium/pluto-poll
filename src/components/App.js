import React from 'react';
import { Link } from 'react-router';
// import Data from '../sample-data';

export default class App extends React.Component {
  _returnSomething(something) {
    // this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }

  render() {
    return (
      <div>
        <header className="site-header">
          <Link to="/"><h1 className="title">Pluto Poll</h1></Link>
          <Link to="/vote" className="link">Vote</Link>
          <Link to="/results" className="link">Results</Link>
        </header>
        <section className="content-section">
          {this.props.children || 'Welcome to the Pluto Poll'}
        </section>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.object,
};
