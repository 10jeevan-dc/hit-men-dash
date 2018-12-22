import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import 'react-circular-progressbar/dist/styles.css';

class PodChart extends Component {
  render() {
    const {podData} = this.props;
    return (
        <BubbleChart
        graph= {{
          zoom: 1.0,
          offsetX: -0.0,
          offsetY: -0.0,
          charge: -1
        }}
        width={500}
        height={600}
        showLegend={false}
        data={podData || []}
    />
    );
  }
}

export default PodChart;
