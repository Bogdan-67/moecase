const MoexAPI = require('moex-api');
const { BadRequest } = require('../exceptions/api-error');

const moexApi = new MoexAPI();

class PriceService {
  async getMoexIndex() {
    return moexApi.index;
  }

  async getPrices(tickers) {
    if (!tickers || tickers.length === 0) {
      throw new BadRequest('tickers не может быть пустым!');
    }

    let prices = {};

    for (let i = 0; i < tickers.length; i++) {
      const moexResponse = await moexApi.securityMarketData(tickers[i]);
      prices[tickers[i]] = moexResponse.LAST;
    }

    return prices;
  }
}

module.exports = new PriceService();
