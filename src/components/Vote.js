import React from 'react';
import Candidate from './Candidate';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleCastVote = this.handleCastVote.bind(this);
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

  handleCastVote(index) {
    const newData = this.state.data;
    newData[index].votes++;
    this.setState({ data: newData });
  }

  render() {
    return (
      <div>
        <h2>What do you think Pluto should be called?</h2>
        <h2>This is where you vote...</h2>
        {this.state.data.map((item, index) =>
          <Candidate
            key={index}
            index={index}
            candidate={item.description}
            votes={item.votes}
            castVote={this.handleCastVote}
          />
        )}
      </div>
    );
  }
}
