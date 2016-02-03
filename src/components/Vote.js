import React from 'react';
import Candidate from './Candidate';
// import Data from '../sample-data';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.ref = base.syncState('/', {
      context: this,
      state: 'data',
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <h2>What do you think Pluto should be called?</h2>
        <h2>This is where you vote...</h2>
        {this.state.data.map(item =>
          <Candidate
            key={item.description}
            candidate={item.description}
            votes={item.votes}
          />
        )}
      </div>
    );
  }
}
