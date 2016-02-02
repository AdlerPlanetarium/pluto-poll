import React from 'react';
import Candidate from './Candidate';
import Data from '../sample-data';

export default class Vote extends React.Component {

  render() {
    return (
      <div>
        <h2>What do you think Pluto should be called?</h2>
        <h2>This is where you vote...</h2>
        {Data.map(item =>
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
