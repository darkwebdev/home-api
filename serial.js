'use strict';

const SerialPort = require('serialport');
const { writeSensor } = require('./sensors');

module.exports = ({ serialPort, baudRate }) => {
  let buffer = '';
  const serial = new SerialPort(serialPort, { baudRate, autoOpen: false });

  serial.open((err) => {
    if (err) {
      return console.log('Cannot open serial port, skipping...');
    } else {
      console.log(`Serial port ${serialPort} opened with rate ${baudRate}.`)
    }
  });

  serial.on('error', (err) => {
    console.log(`Serial error: ${err.message}`);
  });

  serial.on('data', (chunk) => {
    buffer += chunk.toString();

    console.log('[serial] update buffer:', buffer);

    const parsed = parse(buffer);

    if (parsed) {
      const [ str, temp, hum ] = parsed;

      writeSensor('temp', { value: temp }).then(() => {
        console.log(`Data for temp is written.`);
      });
      writeSensor('hum', { value: hum }).then(() => {
        console.log(`Data for hum is written.`);
      });

      buffer = '';
    }
  });

  serial.on('close', () => {
    console.log('Serial port is closed.');
  })
};

function parse(data) {
  return /TEMP=(\d+) C	HUM=(\d+)/.exec(data);
}
