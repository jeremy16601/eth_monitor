'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const EventEmitter = require('events').EventEmitter;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      service
    } = this;

    const event = new EventEmitter();
    event.on('event_'+ctx.query.eth, async() => {
      while (true) {
        console.log('some_事件触发:'+ctx.query.eth);

        // var api = require('etherscan-api').init('8TYUJBYPS9NH3QDEBQDVICXJ7F8EQ1T434','rinkeby');
        // let balance =await api.account.balance('0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf');
        // ctx.body={data:balance}
        const eth = ctx.query.eth;
        const result = await ctx.curl('https://etherscan.io/address/' + eth, {
          // 3 秒超时
          dataType: 'text',
          timeout: 5000,
        });
        const $ = cheerio.load(result.data);
        cheerioTableparser($);
        const table1 = $('#ContentPlaceHolder1_divSummary > .col-md-6:nth-child(1) > table').parsetable(true, true, true);
        const table2 = $('#ContentPlaceHolder1_divSummary > .col-md-6:nth-child(2) > table').parsetable(true, true, true);
        const table3 = $('#transactions > .panel:nth-child(1) > .panel-body:nth-child(1) > table ').parsetable(true, true, true);
        //测试保存
        // const table4=
        let eth_balance, token_balance, transactions;
        if (table2[0].length == 3) {
          eth_balance = table1[1][1];
          transactions = table1[1][3];
          token_balance = table2[1][2].slice(table2[1][2].lastIndexOf('Total'));
        } else {
          eth_balance = table1[1][1];
          transactions = table1[1][3];
          token_balance = table2[1][3].slice(table2[1][3].lastIndexOf('Total'));
        }
        //查询是否存在
        const account = await service.home.findByEth(eth);
        if (account == null) {
          const eth1 = await service.home.saveAccount(eth, eth_balance, token_balance, transactions)
          console.log('save eth=' + JSON.stringify(eth1))
        } else {
          const eth2 = await service.home.updateAccount(account._id, eth_balance, token_balance, transactions)
          console.log('update eth=' + JSON.stringify(eth2))
        };

        let rs;
        for (let i = 1; i < table3[0].length; i++) {
          let params = {};
          params.eth_id = account._id;
          params.TxHash = table3[0][i];
          params.Block = table3[1][i];
          params.Age = table3[2][i];
          params.From = table3[3][i];
          params.IN_Out = table3[4][i];
          params.To = table3[5][i];
          params.Value = table3[6][i];
          params.TxFee = table3[7][i];
          let isTx = await service.home.findByTxHash(params.TxHash);
          if (isTx == null) {
            rs = await service.home.saveEtherscans(params);
            console.log('save etherscan:' + params.From)
          }

        }

        await new Promise(resolve => setTimeout(resolve, 5000));
        // ctx.body = {
        //   str: rs,
        //   id: account._id
        // }
      }
    });

    event.emit('event_'+ctx.query.eth);
  }

 
}

module.exports = HomeController;