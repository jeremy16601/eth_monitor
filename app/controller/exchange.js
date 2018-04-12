'use strict';

const Controller = require('egg').Controller;

class ExchangeController extends Controller {

    

    async list() {
        const {
            ctx,
            service
        } = this;
        const results = await this.service.exchange.list();
        ctx.body = {
            msg: 0,
            data: results
        }
    }

}

module.exports = ExchangeController;