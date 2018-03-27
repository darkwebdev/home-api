'use strict';

const { readSensor, writeSensor } = require('./sensors');

module.exports = {
  list(req, res) {
    console.log('[ctrl] list not implemented');

    res.status(501).json();
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

    readSensor(req.params.id)
      .then((data) => {
        res.status(200).json(data);
        console.log(`[ctrl] ${data.value}`)
      })
      .catch((err) => {
        console.log(`Warning: data for sensor ${req.params.id} not found.`);
        res.status(204).json({});
      });
  },

  delete(req, res) {
    console.log('[ctrl] delete not implemented');

    res.status(501).json();
  }
};
