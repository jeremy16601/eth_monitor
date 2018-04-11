'use strict';

const Service = require('egg').Service;

class ExchangeService extends Service {
    //保存用户基础信息
    async saveExchange(exchanges) {
        const data = new this.ctx.model.Exchange();
        data.title = exchanges.title;
        data.content = exchanges.content;
        data.count = 0;
        return data.save();
    }

    //查询是否有该公告
    async findByTitile(title) {
        const query = {
            title: title
        };
        const opts = {
            sort: {
                create_at: -1
            },
            limit: 1
        };
        return this.ctx.model.Exchange.findOne(query, '_id', opts).exec();
    }
}

module.exports = ExchangeService;