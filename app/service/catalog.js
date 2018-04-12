'use strict';

const Service = require('egg').Service;

class CatalogService extends Service {
    //保存用户基础信息
    async saveCatalog(c) {
        const data = new this.ctx.model.Catalog();
        data.title = c.title;
        data.content = c.content;
        data.price = c.price;
        return data.save();
    }


    async list(){
        return this.ctx.model.Catalog.find().sort({"create_at":-1});
    }
 
}

module.exports = CatalogService;