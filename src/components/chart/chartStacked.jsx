import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

const chartHumidity = ({ sensorData }) => {
const [options, setOptions] = useState({});



useEffect(() => {
    
const chartOptions = {
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Temperature', 'Humidity', 'Water Temperature', 'Water Level']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Temperature', 'Humidity', 'Water Temperature', 'Water Level']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'sensor Data',
        type: 'line',
        stack: 'Total',
        data: sensorData
      },
   


    ]

};
    setOptions(chartOptions);
    console.log(typeof(sensorData));
    

},[sensorData])

  return (

    <>
      <ReactEcharts
        option={options}
        style={{ width: '600px', height: '300px' }}
      />
    </>
  );

};


export default chartHumidity;





















