import React from 'react';

export default class Bar extends React.Component {

  render() {
    return (
      <div>
        <h5>{this.props.candidate}</h5>
        <h5>This will be a bar of the following percentage...</h5>
        <h5>{this.props.percentage}%</h5>
      </div>
    );
  }
}

Bar.propTypes = {
  candidate: React.PropTypes.string,
  percentage: React.PropTypes.number,
};
