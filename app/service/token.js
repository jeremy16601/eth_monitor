'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
 //更新数据
 async saveToken(openid,token){
    const query = { openid:openid };
    const options = {upsert: true};
    return this.ctx.model.Token.update(query,token,options).exec();
}



}

module.exports = TokenService;
