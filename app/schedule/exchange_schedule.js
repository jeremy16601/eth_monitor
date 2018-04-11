const Subscription = require('egg').Subscription;
const cheerio = require('cheerio');

class ExchangeCache extends Subscription {
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
    const result = await ctx.curl('https://block.cc/notice', {
      // 3 秒超时
      dataType: 'text',
      timeout: 5000,
    });
    const $ = cheerio.load(result.data);
    const tx = [];
    const title = [];
    const content = [];
    console.log('开启监控..公告')
    $('.chain-content').find('b').each(function (i, elem) {
      tx[i] = $(this).text();
      if (i % 2 == 0) {
        title.push(tx[i]);
      } else {
        content.push(tx[i]);
      }
    });


    for (var i = 0; i < title.length; i++) {
      let params = {};
      params.title = title[i];
      params.content = content[i];
      let isEx = await service.exchange.findByTitile(params.title);
      if (isEx == null) {
        let ex = await service.exchange.saveExchange(params);
        console.log('save exchange:' + ex)
      }


    }


  }
}

module.exports = ExchangeCache;