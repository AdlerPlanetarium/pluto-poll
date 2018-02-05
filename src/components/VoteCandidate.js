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
    const anim = this.refs[this.props.candidate];
    anim.addEventListener('animationend', this.wiggleDone);
  }

  componentWillUnmount() {
    const anim = this.refs[this.props.candidate];
    anim.removeEventListener('animationend', this.wiggleDone);
  }

  wiggleDone() {
    this.setState({ wiggle: false });
  }

  castVote() {
    if (new Date() - lastClicked >= 3000) {
      lastClicked = Date.now();
      this.props.castVote(this.props.index);
      this.setState({ wiggle: true });
      // console.log('vote cast');
    } else {
      // console.log('waiting for delay, vote not cast');
    }
  }

  render() {
    const wiggle = this.state.wiggle;
    return (
        <img
          key={this.props.candidate}
          ref={this.props.candidate}
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
  votes: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  castVote: React.PropTypes.func,
};
