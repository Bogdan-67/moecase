const PriceService = require('../service/prices-service');

class PricesController {
  async getMoexIndex(req, res, next) {
    try {
      const moexIndex = await PriceService.getMoexIndex();
      res.status(200).json(moexIndex);
    } catch (e) {
      next(e);
    }
  }

  async getPrices(req, res, next) {
    try {
      const { tickers } = req.body;
      const prices = await PriceService.getPrices(tickers);
      console.log('prices', prices);
      res.status(200).json(prices);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PricesController();
