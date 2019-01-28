import React, { Component } from 'react';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import PerformanceChart from '../PerformanceChart/PerformanceChart';
import mockPhone from '../../Assets/phone_i.png';
import BubbleChart from '../BubbleChart/BubbleChart';
import './App.css';

class App extends Component {

  state = {
    podsNumber: 10,
    devicesNumber: 9,
    screenState: 1
  }

  getMockDeviceGrid = (devicesNumber) => {
    const mockDevices = [];
    for(let i=0; i < devicesNumber; i+=1)
      mockDevices.push(<div className="App-device-grid-item">
        <img src={mockPhone} alt={`mock_device_${i}`}/>
      </div>);
    const mockDeviceGrid = 
    (<div className="App-container-box">
      <p className="App-section-header">Devices</p>
      <div class="App-device-grid-container">
      {
        mockDevices
      }
      </div>
      <p className="App-section-header">{devicesNumber}</p>
    </div>);
    return mockDeviceGrid;
  }

  getMockPodBubbleChart = (podsNumber) => {
    const mockPodData = [];
    for(let i=0; i < podsNumber; i+=1)
      mockPodData.push({ label: '', value: 1 });
    return (<div className="App-container-box">
      <p className="App-section-header">Pods</p>
      <BubbleChart podData={mockPodData}/>
    </div>);
  }

  getMockLoadBalancerSetup = () => {
    const balancerLines = [];
    const {devicesNumber} = this.state;
    const loadBalancerLine = (<p className="App-mock-load-balancer-line">{'<-------------------->'}</p>);
    for(let i=0; i < (Math.ceil(devicesNumber)/3); i+=1)
      balancerLines.push(loadBalancerLine);
    return (
      <div className="App-mock-load-balancer-container">
        <div className="App-mock-load-balancer-lines-container-left">
        {
          balancerLines
        }
        </div>
        <div className="App-mock-load-balancer">
          LOAD - BALANCER
        </div>
        <div className="App-mock-load-balancer-lines-container-right">
          {loadBalancerLine}
        </div>
      </div>
    )
  }

  getMockPerformanceChart = () => {
    return (
      <div className="App-container-box">
        <p className="App-section-header">Performance</p>
        <div className="App-mock-performance-chart-container">
          <PerformanceChart />
        </div>
      </div>
    );
  }

  getMockMetrics = () => {
    return (
      <div className="App-container-box">
          <p className="App-section-header">Other metrics</p>
            <div>
              <p className="App-section-text"> -> Network data usage: 10Kb</p>
              <p className="App-section-text"> -> Average CPU usage: 97%</p>
              <p className="App-section-text"> -> Average Memory usage: 97%</p>
              <p className="App-section-text"> -> Minimum PODs: 10</p>
              <p className="App-section-text"> -> Maximum PODs: 100</p>
            </div>
          </div>
    );
  }

  getMockProgressCircle = (percentage, header) => {
    return (
      <div className="App-container-box">
        <p className="App-section-header">{header}</p>
        <ProgressCircle percentage={percentage} />
      </div>
    );
  }

  switchDashBoard = () =>{
    this.setState({
      screenState: ((this.state.screenState + 1) % 2)
    });
  }

  componentDidMount() {
    this.getPodsInfo();
    this.getPlayerCount();
    setInterval(this.getPodsInfo, 1000);
    setInterval(this.getPlayerCount, 1000);
  }

  getPodsInfo = async () => {
    try {
      const res = await fetch('http://35.244.37.99/pod/info');
      console.log(1);
      const podsInfo = await res.json();
      const podsNumber = podsInfo.number_of_pods;

      this.setState({
        podsNumber
      })
    } catch (error) {
        // console.log(error);
    }
  }

  getPlayerCount = async () => {
    try {
      const res = await fetch('http://35.244.247.204/info/player-count');
      console.log(2);
      const resJSON = await res.json();
      const devicesNumber = resJSON.playerCount;

      this.setState({
        devicesNumber
      })
    } catch (error) {
        // console.log(error);
    }
  }

  render() {
    const {podsNumber, devicesNumber, screenState} = this.state;
    return (
      <div className="App">
        <div className="App-header">App Dashboard</div>
        <div className="App-container">
          {
            screenState === 1 ? [this.getMockDeviceGrid(devicesNumber), 
              this.getMockLoadBalancerSetup(), 
              this.getMockPodBubbleChart(podsNumber)]
              : [this.getMockPerformanceChart(), 
                this.getMockProgressCircle(devicesNumber, 'Devices'), 
                this.getMockProgressCircle(podsNumber, 'Pods'), 
                this.getMockMetrics()]
          }
        </div>
        <br/>
        <br/>
        <div><button className="App-special-button" onClick={this.switchDashBoard}>Switch dashboard</button></div>
      </div>
    );
  }
}

export default App;
