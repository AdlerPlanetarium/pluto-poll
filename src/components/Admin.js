import React from 'react';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [0],
      toggle: false,
    };

    this.handleVoteChange = this.handleVoteChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  getAllCurrentVotes() {
    const allCurrentVotes = this.state.data
      .map(item => parseInt(item.votes, 10))
      .reduce((a, b) => a + b);
    return allCurrentVotes;
  }

  getAllTotalVotes() {
    const allTotalVotes = this.state.data
      .map(item => parseInt(item.totalVotes, 10))
      .reduce((a, b) => a + b);
    return allTotalVotes;
  }

  handleReset() {
    if (window.confirm(  // eslint-disable-line no-alert
      'Are you sure you want to reset all votes?'
    )) {
      const newData = this.state.data;
      const newToggle = !this.state.toggle;
      const date = new Date();
      for (const item of newData) {
        item.votes = 0;
        item.reset = date.toString();
      }
      this.setState({ data: newData, toggle: newToggle });
    }
  }

  handleVoteChange(e) {
    const index = e.target.name;
    const newVotes = e.target.value;
    const newData = this.state.data;
    newData[index].votes = newVotes;
    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="admin">
        <h1>Edit Votes...</h1>
        {this.state.data.map((item, index) =>
          <div className="adminItem" key={`${item.description}-${this.state.toggle}`}>
            <h3>{item.description}</h3>
            <label>Current Votes {' - '}
            <input
              type="number"
              name={index}
              defaultValue={item.votes}
              onChange={this.handleVoteChange}
            ></input>
            </label>
            <h4>Cumulative Votes - {item.totalVotes}</h4>
          </div>
        )}
        <button onClick={this.handleReset}>Reset All Current Votes</button>
        <br></br>
        <h4>Current Vote Total - {this.getAllCurrentVotes()}</h4>
        <h4>Cumulative Vote Total - {this.getAllTotalVotes()}</h4>
      </div>
    );
  }
}
