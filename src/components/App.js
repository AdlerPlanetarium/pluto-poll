import React from 'react';

export default class App extends React.Component {
  _returnSomething(something) {
    // this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }

  render() {
    return (
      <div>
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
