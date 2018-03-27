'use strict';

const fs = require('fs');

module.exports = {
  readSensor(id) {
    const dataFile = `./sensors/${id}.json`;

    //invalidate cache
    delete require.cache[dataFile];

    try {
      return require(dataFile);
    } catch (err) {
      return undefined;
    }
  },

  writeSensor(id, valueObject) {
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
};
