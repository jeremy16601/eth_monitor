'use strict';
 
const Service = require('egg').Service;

class HomeService extends Service {

    //保存用户基础信息
    async saveAccount(eth,eth_balance,token_balance,transactions){
        const data=new this.ctx.model.Account();
        data.eth=eth;
        data.eth_balance=eth_balance;
        data.token_balance=token_balance;
        data.transactions=transactions;
        return data.save();
    }

    //保存用户交易记录
    async saveEtherscans(params){
        const data=new this.ctx.model.Etherscan();
        data.eth_id=params.eth_id;
        data.TxHash=params.TxHash;
        data.Block=params.Block;
        data.Age=params.Age;
        data.From=params.From;
        data.IN_Out=params.IN_Out;
        data.To=params.To;
        data.Value=params.Value;
        data.TxFee=params.TxFee;
        return data.save();
    }

    //更新数据
    async updateAccount(id,eth_balance,token_balance,transactions){
        const query = { _id: id };
        const update = { $set: { eth_balance: eth_balance,token_balance:token_balance, transactions:transactions} };
        return this.ctx.model.Account.where({ _id: id }).update( update).exec();
    }

    //查询是否存储
    async findByEth(eth){
        const query = { eth: eth };
        const opts = { sort: { create_at: -1 }, limit: 1 };
        return this.ctx.model.Account.findOne(query, '_id', opts).exec();
    }

        //查询是否有交易id
        async findByTxHash(TxHash){
            const query = { TxHash: TxHash };
            const opts = { sort: { create_at: -1 }, limit: 1 };
            return this.ctx.model.Etherscan.findOne(query, '_id', opts).exec();
        }
}
module.exports = HomeService;

