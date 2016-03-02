import React from 'react';
import Bar from './ResultsBar';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.ref = base.bindToState('/', {
      context: this,
      state: 'data',
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  calcPercentage(votes) {
    const totalVotes = this.state.data.map(item => parseInt(item.votes, 10)).reduce((a, b) => a + b);
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
            percentage={this.calcPercentage(item.votes)}
          />
        )}
      </div>
    );
  }
}
