import styles from './styles/Home.module.scss';
import React, { useState } from 'react';
import SensorCard from '../components/sensorcard/SensorCard';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { GiWaterTank } from 'react-icons/gi';
import ChartData from '../components/chart/chartData';
import ChartTempGauge from '../components/chart/chartTempGauge';
import ChartSensors from '../components/chart/chartSensors';
import ChartLine from '../components/chart/chartLine';
import CharStacked from '../components/chart/chartStacked';

var mqtt = require('mqtt');

//add your broker configurations
var options = {
  protocol: 'ws',
  username: '',
  password: '',
  keepalive: 20,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
};

//add your broker addresses
var client = mqtt.connect('mqtt://192.168.0.111:9001', options);
client.subscribe('growroom01/realtime');
console.log('Client subscribed ');

export default function Home() {
  const [sensor, setSensor] = useState({
    growname: '',
    temperature: '',
    watertemp: '',
    humidity: '',
    waterlevel: '',
  });

  client.on('message', function (topic, message) {
    let mqttObject = JSON.parse(message);
    let growname = mqttObject.growname;
    let temperature = mqttObject.temperature;
    let watertemp = mqttObject.watertemp;
    let humidity = mqttObject.humidity;
    let waterlevel = mqttObject.waterlevel;

    setSensor({
      growname: growname,
      temperature: temperature,
      watertemp: watertemp,
      humidity: humidity,
      waterlevel: waterlevel,
    });
  });

  const Degrees = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'celsius',
  });

  return (
    <div>
      <header className={styles.main}>
        <h1>Mqtt Dashboard</h1>
      </header>

      <main className={styles.container}>
        <SensorCard
          growroom={sensor.growname}
          icon={<FaTemperatureHigh size={50} color=' aquamarine' />}
          sensorName='Temperature'
          sensor={Degrees.format(sensor.temperature)}
        />

        <SensorCard
          growroom={sensor.growname}
          icon={<WiHumidity size={50} color=' aquamarine' />}
          sensorName='Humidity'
          sensor={sensor.humidity + '%'}
        />

        <SensorCard
          growroom={sensor.growname}
          icon={<FaTemperatureHigh size={50} color=' aquamarine' />}
          sensorName='Watertemp'
          sensor={Degrees.format(sensor.watertemp)}
        />

        <SensorCard
          growroom={sensor.growname}
          icon={<GiWaterTank size={50} color=' aquamarine' />}
          sensorName='Waterlevel'
          sensor={sensor.waterlevel.toString()}
        />
        <div className={styles.chart}>
          {sensor.temperature && (
            <ChartData
              sensorData={[sensor.temperature]}
              sensorName='Temperature'
              format='{value} °C'
            />
          )}

          {sensor.temperature && (
            <ChartTempGauge
              sensorData={[sensor.temperature]}
              format='{value} °C'
            />
          )}

          {sensor.humidity && (
            <ChartData
              sensorData={[sensor.humidity]}
              sensorName='Humidity'
              format='{value} %'
            />
          )}

          {sensor.humidity && (
            <ChartTempGauge sensorData={[sensor.humidity]} format='{value} %' />
          )}

          {/* {sensor.humidity && (
            <ChartSensors
              sensorData={[
                sensor.temperature,
                sensor.humidity,
                sensor.watertemp,
                sensor.waterlevel,
              ]}
            />
          )} */}

          {/* {sensor.humidity && (
            <CharStacked
              sensorData={[
                sensor.temperature,
                sensor.humidity,
                sensor.watertemp,
                sensor.waterlevel,
              ]}
            />
          )} */}
        </div>
      </main>
    </div>
  );
}

//exmaple is your dont's have a broker to conect

{
  /* <SensorCard
growroom={sensor.growname}
icon={<FaTemperatureHigh size={50} color=' aquamarine' />}
sensorName='Temperature'
sensor={degrees.format(25)}
/>

<SensorCard
growroom={sensor.growname}
icon={<WiHumidity size={50} color=' aquamarine' />}
sensorName='Humidity'
sensor={40 + '%'}
/>

<SensorCard
growroom={sensor.growname}
icon={<FaTemperatureHigh size={50} color=' aquamarine' />}
sensorName='Watertemp'
sensor={degrees.format(25)}
/>

<SensorCard
growroom={sensor.growname}
icon={<GiWaterTank size={50} color=' aquamarine' />}
sensorName='Waterlevel'
sensor='true'
/> */
}

// sensor={Degrees.format(sensor.watertemp)}
