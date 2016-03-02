import React from 'react';

import Rebase from 're-base';
const base = Rebase.createClass('https://pluto-poll.firebaseio.com');

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], toggle: false };
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

  handleVoteChange(e) {
    const index = e.target.name;
    const newVotes = e.target.value;
    const newData = this.state.data;
    newData[index].votes = newVotes;
    this.setState({ data: newData });
  }

  handleReset() {
    if (window.confirm('Are you sure you want to reset all votes?')) {
      const newData = this.state.data;
      const newToggle = !this.state.toggle;
      for (const item of newData) {
        item.votes = 0;
      }
      this.setState({ data: newData, toggle: newToggle });
    }
  }

  render() {
    return (
      <div className="admin">
        <h1>Edit Votes...</h1>
        <br></br>
        {this.state.data.map((item, index) =>
          <div key={`${item.description}-${this.state.toggle}`}>
            <label>{item.description}{' - '}
            <input
              type="number"
              name={index}
              defaultValue={item.votes}
              onChange={this.handleVoteChange}
            ></input>
            </label>
          </div>
        )}
        <br></br>
        <button onClick={this.handleReset}>Reset All</button>
      </div>
    );
  }
}
