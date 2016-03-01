import React from 'react';

let lastClicked = 0;

export default class Candidate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { wiggle: false };
    this.castVote = this.castVote.bind(this);
    this.wiggleDone = this.wiggleDone.bind(this);
  }

  componentDidMount() {
    const elm = this.refs.candidate;
    elm.addEventListener('animationend', this.wiggleDone);
  }

  componentWillUnmount() {
    const elm = this.refs.candidate;
    elm.removeEventListener('animationend', this.wiggleDone);
  }

  castVote() {
    if (new Date() - lastClicked >= 10000) {
      lastClicked = Date.now();
      this.props.castVote(this.props.index);
      this.setState({ wiggle: true });
    }
  }

  wiggleDone() {
    this.setState({ wiggle: false });
  }

  render() {
    const wiggle = this.state.wiggle;
    return (
      <img
        key={this.props.candidate}
        ref="candidate"
        className={wiggle ? 'candidate wiggle' : 'candidate'}
        onClick={this.castVote}
        src={`Image${this.props.index}.png`}
      />
    );
  }
}

Candidate.propTypes = {
  index: React.PropTypes.number,
  candidate: React.PropTypes.string,
  votes: React.PropTypes.number,
  castVote: React.PropTypes.func,
};
