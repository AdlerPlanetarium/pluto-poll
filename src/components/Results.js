import React from 'react';
import Bar from './Bar';
import Data from '../sample-data';

export default class Results extends React.Component {

  _calcPercentage(votes) {
    const totalVotes = Data.map(item => item.votes).reduce((a, b) => a + b);

    return Math.round((votes / totalVotes) * 100);
  }

  render() {
    return (
      <div>
        <h2>This is where results will go...</h2>
        {Data.map(item =>
          <Bar
            key={item.description}
            candidate={item.description}
            percentage={this._calcPercentage(item.votes)}
          />
        )}
      </div>
    );
  }
}
