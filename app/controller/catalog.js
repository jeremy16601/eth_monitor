'use strict';

const Controller = require('egg').Controller;

class CatalogController extends Controller {

    async add_catalog() {
        const {
            ctx,
            service
        } = this;
        const result = await service.catalog.saveCatalog(ctx.request.body)
        ctx.body = {
            data: result
        }
    }

    async list() {
        const {
            ctx,
            service
        } = this;
        const results = await this.service.catalog.list();
        ctx.body = {
            msg: 0,
            data: results
        }
    }

}

module.exports = CatalogController;