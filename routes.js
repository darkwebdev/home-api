'use strict';

const ctrl = require('./controller');

module.exports = function(app) {
  app.route('/sensors/:id([a-z0-9\-_]+)')
    .get(ctrl.read)
    .post(ctrl.create)
    // .put(ctrl.update)
    .delete(ctrl.delete)
  ;

  app.route('/sensors')
    .get(ctrl.list)
  ;
};
