const db = require('../db');

class DropService {
  async getAllDrop() {
    const drop = await db.query(`SELECT * FROM drop`);
    return drop.rows;
  }

  async createDrop(ticker, name, description, logo, color) {
    if (!color) color = 'e8e8e8';
    const created = await db.query(
      `INSERT INTO drop(ticker, name, description, logo, color) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [ticker, name, description, logo, color],
    );
    return created.rows[0];
  }

  async editDrop({ id_drop, ticker, name, description, logo, color }) {
    const edited = await db.query(
      `UPDATE drop SET ticker = $1, name = $2, description = $3, logo = $4, color = $5 WHERE id_drop = $6 RETURNING *`,
      [ticker, name, description, logo, color, id_drop],
    );
    return edited.rows[0];
  }

  async deleteDrop(id) {
    await db.query(`DELETE FROM drop WHERE id_drop = $1`, [id]);
    return 0;
  }

  async getOneDrop({ id }) {
    const drop = await db.query(`SELECT * FROM drop WHERE id_drop = $1`, [id]);
    return drop.rows[0];
  }
}
module.exports = new DropService();
