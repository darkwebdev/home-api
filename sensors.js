'use strict';

const fs = require('fs');

module.exports = {
  readSensor(id) {
    const dataFile = `./sensors/${id}.json`;

    return new Promise((resolve, reject) => {
      fs.readFile(dataFile, (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            resolve(JSON.parse(data));
          } catch(ex) {
            reject(ex);
          }
        }
      });
    });
  },

  writeSensor(id, valueObject) {
    const dataFile = `./sensors/${id}.json`;

    return new Promise((resolve, reject) => {
      fs.writeFile(dataFile, JSON.stringify(valueObject), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};
