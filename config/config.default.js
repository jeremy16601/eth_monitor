'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523083676576_9035';

  // add your config here
  config.middleware = [];

  // config.mongoose = {
  //   url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/eth_jk?authSource=admin',
  //   options: {
  //     server: {
  //       poolSize: 20
  //     },
  //   },
  // };
  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://joker:justjoker@192.168.1.125:27017/eth_jk?authSource=admin',
    options: {
      server: {
        poolSize: 20
      },
    },
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  }

  config.security = {
    ctoken: false,
    csrf: {
      enable: false
    },
    domainWhiteList: ['localhost:8080', 'http://192.168.1.125:8080', 'http://www.ethgamestop.com']
  }

  return config;
};
