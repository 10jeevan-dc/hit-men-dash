import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class ProgressCircle extends Component {
  render() {
    const {percentage} = this.props;
    return (
      <div>
        <header>
        <CircularProgressbar
          percentage={percentage}
          text={`${percentage}`}
        />
        </header>
      </div>
    );
  }
}

export default ProgressCircle;
