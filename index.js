'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const addRoutes = require('./routes');
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

addRoutes(app);

app.listen(port);

console.log(`Home API server started on: ${port}.`);
