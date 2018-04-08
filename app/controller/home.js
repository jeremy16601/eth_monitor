'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
class HomeController extends Controller {
  async index() {
    const {
      ctx,
      service
    } = this;
    // var api = require('etherscan-api').init('8TYUJBYPS9NH3QDEBQDVICXJ7F8EQ1T434','rinkeby');
    // let balance =await api.account.balance('0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf');
    // ctx.body={data:balance}
    const result = await ctx.curl('https://etherscan.io/address/' + ctx.query.eth_address, {
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
    const account = await service.home.findByEth(ctx.query.eth_address);
    // if (account==null) {
    //   const eth = await service.home.saveAccount(ctx.query.eth_address, eth_balance, token_balance, transactions)
    //   ctx.body = {
    //     data: eth
    //   }
    // } else {
    //   const eth = await service.home.updateAccount(account._id, eth_balance, token_balance, transactions)
    //   ctx.body = {
    //     eth: eth
    //   }
    // }
    //  ;
    
    let params = {}
    params.eth_id;
    params.TxHash;
    params.Block;
    params.Age;
    params.From;
    params.IN_Out;
    params.To;
    params.Value;
    params.TxFee;
    const eth = await service.home.saveAccount(ctx.query.eth_address, eth_balance, token_balance, transactions)
    ctx.body = {
      table: table1,
      table2: table2,
      table3: table3
    };

  }

}

module.exports = HomeController;