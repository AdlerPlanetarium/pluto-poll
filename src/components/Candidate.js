import React from 'react';

export default class Candidate extends React.Component {

  constructor(props) {
    super(props);
    this._castVote = this._castVote.bind(this);
  }

  _castVote() {
    this.props.castVote(this.props.index);
  }

  render() {
    return (
      <div>
        <h5>{this.props.candidate}</h5>
        <h5>Current votes...</h5>
        <h5>{this.props.votes}</h5>
        <p onClick={this._castVote}>Click here to vote for {this.props.candidate}</p>
      </div>
    );
  }
}

Candidate.propTypes = {
  index: React.PropTypes.number,
  candidate: React.PropTypes.string,
  votes: React.PropTypes.number,
  castVote: React.PropTypes.func,
};
