'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/eth_monitor', controller.home.index);
  router.post('/add_catalog',controller.catalog.add_catalog);
};
