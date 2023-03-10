import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

const chartSensors = ({ sensorData }) => {
const [options, setOptions] = useState({});

useEffect(() => {
const chartOptions = {
 xAxis: {
    type: 'category',
    data: ['temp', 'Hum', 'WateTemp', 'waterlv']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: sensorData,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: '#4AA541'
      },
    },
  ],


  
};

setOptions(chartOptions);

}, [sensorData]);

  console.log('sensorData:', sensorData);
  return (

    <>
      <ReactEcharts
        option={options}
        style={{ width: '600px', height: '300px' }}
      />
    </>
  );

};


export default chartSensors;










