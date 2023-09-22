const MoexAPI = require('moex-api');
const { BadRequest } = require('../exceptions/api-error');
const moexApi = new MoexAPI();

const db = require('../db');

class StockService {
  async getAllStocks() {
    const stocks = await db.query(`SELECT * FROM stocks`);

    let stocksData = stocks.rows;

    for (let i = 0; i < stocksData.length; i++) {
      const moexResponse = await moexApi.securityMarketData(stocksData[i].ticker);
      stocksData[i] = { ...stocksData[i], price: moexResponse.LAST };
    }

    console.log(stocksData);

    return stocksData;
  }

  async createStock(ticker, name, description, logo, color) {
    if (!color) color = 'e8e8e8';
    const created = await db.query(
      `INSERT INTO stocks(ticker, name, description, logo, color) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [ticker, name, description, logo, color],
    );
    return created.rows[0];
  }

  async editStock({ id_stock, ticker, name, description, logo, color }) {
    const edited = await db.query(
      `UPDATE stocks SET ticker = $1, name = $2, description = $3, logo = $4, color = $5 WHERE id_stock = $6 RETURNING *`,
      [ticker, name, description, logo, color, id_stock],
    );
    return edited.rows[0];
  }

  async deleteStock(id) {
    await db.query(`DELETE FROM stocks WHERE id_stock = $1`, [id]);
    return 0;
  }

  async getOneStock({ id }) {
    const stock = await db.query(`SELECT * FROM stocks WHERE id_stock = $1`, [id]);
    return stock.rows[0];
  }
}
module.exports = new StockService();
