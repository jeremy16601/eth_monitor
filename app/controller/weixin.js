'use strict';

const Controller = require('egg').Controller;
const OAuth = require('wechat-oauth');
const WechatAPI = require('co-wechat-api');
/**
 *
 *
 * @class WeixinController
 * @extends {Controller}
 */
class WeixinController extends Controller {

    async home() {
        const {
            ctx,
            service
        } = this;
        const client = new OAuth('wxcc6151a7b3038042', 'ab4f61d0861cd16cba4570fc6a351366', function (openid, callback) {
            // 传入一个根据openid获取对应的全局token的方法
            // 在getUser时会通过该方法来获取token
            // Token.getToken(openid, callback);
            console.log('openid:'+openid)
            return (openid,callback);
        }, function (openid, token, callback) {
            // 持久化时请注意，每个openid都对应一个唯一的token!
            // Token.setToken(openid, token, callback);
            console.log('openid:'+openid)
        });
        console.log('client:'+JSON.stringify(client));
        // const api = new WechatAPI('wxcc6151a7b3038042', 'ab4f61d0861cd16cba4570fc6a351366');
        // const result = await api.updateRemark('open_id', 'remarked');
        //  const user= api.getUser({openid: 'openid', lang: 'en'});

    }



}

module.exports = WeixinController;
