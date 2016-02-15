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
      <img className="candidate" onClick={this._castVote} src={`Image${this.props.index}.svg`}/>
    );
  }
}

Candidate.propTypes = {
  index: React.PropTypes.number,
  candidate: React.PropTypes.string,
  votes: React.PropTypes.number,
  castVote: React.PropTypes.func,
};
