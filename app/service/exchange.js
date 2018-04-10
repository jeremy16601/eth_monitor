'use strict';
 
const Service = require('egg').Service;

class ExchangeService extends Service {
    //保存用户基础信息
    async saveExchange(exchanges){
        const data=new this.ctx.model.Exchange();
        data=exchanges; 
        return data.save();
    }

}

module.exports = ExchangeService;