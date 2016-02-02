import React from 'react';

export default class Candidate extends React.Component {

  constructor(props) {
    super(props);
    this._castVote = this._castVote.bind(this);
    this.state = { votes: props.votes };
  }

  _castVote() {
    this.setState({ votes: this.state.votes + 1 });
  }

  render() {
    return (
      <div>
        <h5>{this.props.candidate}</h5>
        <h5>Current votes...</h5>
        <h5>{this.state.votes}</h5>
        <p onClick={this._castVote}>Click here to vote for {this.props.candidate}</p>
      </div>
    );
  }
}

Candidate.propTypes = {
  candidate: React.PropTypes.string,
  votes: React.PropTypes.number,
};
