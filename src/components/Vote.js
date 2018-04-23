import React from 'react';
import Candidate from './VoteCandidate';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      intervalID: undefined,
    };

    this.handleCastVote = this.handleCastVote.bind(this);
    this.initialReset = this.initialReset.bind(this);
    this.resetVotes = this.resetVotes.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.ref = base.syncState('/', {
      context: this,
      state: 'data',
      asArray: true,
      then: this.initialReset,
    });
    this.setTimer();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    clearInterval(this.state.intervalID);
  }

  setTimer() {
    const intervalID = setInterval(() => {
      console.log('interval check');
      const date = new Date();
      const dayOfMonth = date.getDate();

      const resetDate = new Date(this.state.data[0].reset);
      const resetDayOfMonth = resetDate.getDate();
      console.log('day = ', dayOfMonth);
      console.log('resetDay = ', resetDayOfMonth);
      if (dayOfMonth !== resetDayOfMonth) {
        console.log('reseting...');
        this.resetVotes(date);
      }
    }, 600000);
    this.setState({ intervalID });
  }

  initialReset() {
    console.log('initialReset check');
    const date = new Date();
    const dayOfMonth = date.getDate();

    const resetDate = new Date(this.state.data[0].reset);
    const resetDayOfMonth = resetDate.getDate();

    console.log('day = ', dayOfMonth);
    console.log('resetDay = ', resetDayOfMonth);
    if (dayOfMonth !== resetDayOfMonth) {
      console.log('reseting...');
      this.resetVotes(date);
    }
  }

  resetVotes(date) {
    const newData = this.state.data;
    for (const item of newData) {
      item.votes = 0;
      item.reset = date.toString();
    }
    console.log('reset with newData = ', newData);
    this.setState({ data: newData });
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
