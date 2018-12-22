import React, { Component } from 'react';
import { Chart } from "react-charts";
import 'react-circular-progressbar/dist/styles.css';

class PerformanceChart extends Component {
  render() {
    const mockPerformanceData = [
        {
          label: "Series 1",
          data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
        },
        {
          label: "Series 2",
          data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        }
      ];
    const mockAxes = [
        { primary: true, type: "linear", position: "bottom" },
        { type: "linear", position: "left" }
      ];
    return (
        <Chart dark={true} data={mockPerformanceData} axes={mockAxes} />
    );
  }
}

export default PerformanceChart;
