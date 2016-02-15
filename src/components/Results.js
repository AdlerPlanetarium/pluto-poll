import React from 'react';
import Bar from './Bar';

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

  _calcPercentage(votes) {
    const totalVotes = this.state.data.map(item => item.votes).reduce((a, b) => a + b);

    return Math.round((votes / totalVotes) * 100);
  }

  render() {
    return (
      <div className="results">
        {this.state.data.map((item, index) =>
          <Bar
            key={index}
            candidate={item.description}
            percentage={this._calcPercentage(item.votes)}
          />
        )}
      </div>
    );
  }
}
