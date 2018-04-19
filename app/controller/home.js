'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const EventEmitter = require('events').EventEmitter;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      service
    } = this;

    ctx.body = {
      data: 'hi eth'
    }
  }


}

module.exports = HomeController;