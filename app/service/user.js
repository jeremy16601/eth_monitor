'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    //保存用户基础信息
    async saveUser(user) {
        const data = new this.ctx.model.User();
        data.openid=user.openid,
        data.nickname=user.nickname,
        data.sex=user.sex,
        data.city=user.city,
        data.country=user.country,
        data.province=user.province,
        data.headimgurl=user.headimgurl,
        data.remark=user.remark,
        data.groupid=user.groupid, 
        data.vip=user.vip //订阅的项目 
        return data.save();
    }


    async list(){
        return this.ctx.model.User.find().sort({"create_at":-1});
    }
 
}

module.exports = UserService;