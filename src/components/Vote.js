import React from 'react';
import Candidate from './VoteCandidate';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
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
    newData[index].totalVotes++;
    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="vote">
        <div className="question">
          <h1>What do you think</h1>
          <h1 className="tighten">Pluto should be called?</h1>
        </div>
        <img className="heart" src="Heart-Image-Cropped.png"/>
        <div className="voting-area">
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
      </div>
    );
  }
}
