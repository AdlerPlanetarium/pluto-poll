import React from 'react';

export default class Bar extends React.Component {
  render() {
    return (
      <div className="bar">
        <h5 className="name">{this.props.candidate}</h5>
        <div className="result-container">
          <div id={this.props.candidate} className="result-bar" style={{ height: this.props.percentage }}><h5 className="percentage">{this.props.percentage}</h5></div>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  candidate: React.PropTypes.string,
  percentage: React.PropTypes.number,
};
