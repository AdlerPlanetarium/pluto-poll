import React from 'react';

export default class Bar extends React.Component {

  render() {
    return (
      <div className="bar">
        <h5 className="name">{this.props.candidate}</h5>
        <svg width="150" height="150">
          <rect x="10" y="100" rx="10" ry="10" width="100" height={this.props.percentage} style={{ fill: '#FBD508' }} />
        </svg>
        <h5 className="percentage">{this.props.percentage}%</h5>
      </div>
    );
  }
}

Bar.propTypes = {
  candidate: React.PropTypes.string,
  percentage: React.PropTypes.number,
};
