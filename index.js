'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const addRoutes = require('./routes');
const listenSerial = require('./serial');

const port = process.env.PORT || 8080;
const serialPort = process.env.SERIAL_PORT || '/dev/tty-usbserial1';
const baudRate = Number(process.env.BAUD_RATE) || 57600;
const app = express();

app.use(bodyParser.json());

addRoutes(app);

app.listen(port);

console.log(`Home API server started on: ${port}.`);

listenSerial({ serialPort, baudRate });
