'use strict';

const fs = require('fs');

module.exports = {
  list(req, res) {
    console.log('[ctrl] list not implemented');
  },

  create(req, res) {
    console.log(`[ctrl] create sensor ${req.params.id}`);

    writeSensor(req.params.id, { value: req.body.value })
      .then(() => {
        console.log(`Data for ${req.params.id} is written.`);
        res.status(201).json({});
      })
      .catch((err) => {
        console.error(`Data for ${req.params.id} is NOT written: ${err}`);
        res.status(500).json({ "error": err });
      });
  },

  read(req, res) {
    console.log(`[ctrl] read sensor ${req.params.id}`);

    const data = readSensor(req.params.id);

    res.json(data);
  },

  delete(req, res) {
    console.log('[ctrl] delete not implemented');
  }
};

function readSensor(id) {
  const dataFile = `./sensors/${id}.json`;

  try {
    return require(dataFile);
  } catch(err) {
    console.log(`Warning: Requested sensors data file ${dataFile} not found.`);

    return {};
  }
}

function writeSensor(id, valueObject) {
  const dataFile = `./sensors/${id}.json`;

  return new Promise((resovle, reject) => {
    fs.writeFile(dataFile, JSON.stringify(valueObject), (err) => {
      if (err) {
        reject(err);
      } else {
        resovle();
      }
    });
  });
}
