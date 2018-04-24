import React from 'react';
import Bar from './ResultsBar';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      intervalID: undefined,
    };

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

  calcPercentage(votes) {
    const totalVotes = this.state.data
      .map(item => parseInt(item.votes, 10))
      .reduce((a, b) => a + b);
    if (totalVotes === 0) {
      return '0%';
    }
    return Math.round((votes / totalVotes) * 100) + '%';
  }

  render() {
    return (
      <div className="results">
        {this.state.data.map((item, index) =>
          <Bar
            key={index}
            candidate={item.description}
            votes={item.votes}
            percentage={this.calcPercentage(item.votes)}
          />
        )}
      </div>
    );
  }
}
