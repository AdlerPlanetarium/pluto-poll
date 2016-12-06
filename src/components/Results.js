import React from 'react';
import Bar from './ResultsBar';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mockData,
      intervalID: undefined,
    };
  }

  componentDidMount() {
    this.ref = base.bindToState('/', {
      context: this,
      state: 'data',
      asArray: true,
    });
    this.checkTime();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    clearInterval(this.state.intervalID);
  }

  checkTime() {
    const intervalID = setInterval(() => {
      const date = new Date();
      if (date.getHours() === 3) {
        const newData = this.state.data;
        for (const item of newData) {
          item.votes = 0;
        }
        this.setState({ data: newData });
      }
    }, 3600000);
    this.setState({ intervalID });
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
