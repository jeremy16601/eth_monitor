const Subscription = require('egg').Subscription;
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

class UpdateEtherscan extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const {
        ctx,
        service
      } = this;
      //ctx.query.eth_address
      const eth='0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
    const result = await ctx.curl('https://etherscan.io/address/'+eth , {
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
        const eth = await service.home.saveAccount(eth, eth_balance, token_balance, transactions)
        console.log('save eth='+eth)
      } else {
        const eth = await service.home.updateAccount(account._id, eth_balance, token_balance, transactions)
        console.log('update eth='+eth)
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
          console.log('执行了定时任务+：'+params.From);
        }
  
      }

  }
}

module.exports = UpdateEtherscan;