'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/eth_monitor', controller.home.index);
  router.post('/add_catalog',controller.catalog.add_catalog);//新增分类
  router.get('/catalog_list',controller.catalog.list); //查询分类列表
  router.get('/exchange_list',controller.exchange.list);//查询公告列表
};
