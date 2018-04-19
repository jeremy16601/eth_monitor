'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async add_catalog() {
        const {
            ctx,
            service
        } = this;
        const result = await service.user.saveUser(ctx.request.body)
        ctx.body = {
            data: result
        }
    }

    async list() {
        const {
            ctx,
            service
        } = this;
        const results = await this.service.user.list();
        ctx.body = {
            msg: 0,
            data: results
        }
    }

}

module.exports = UserController;