const db = require('../db');
const CaseDTO = require('../dtos/case-dto');
const ApiError = require('../exceptions/api-error');
const MoexAPI = require('moex-api');
const moexApi = new MoexAPI();

class CaseService {
  isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  async getCaseDrop(items) {
    let caseItems = [];
    for (let index in items) {
      const itemFromStocks = await db.query(`SELECT * FROM stocks WHERE id_stock = $1`, [
        items[index].stock_id,
      ]);
      const moexResponse = await moexApi.securityMarketData(itemFromStocks.rows[0].ticker);
      const itemWithPrice = { ...itemFromStocks.rows[0], price: moexResponse.LAST };
      caseItems.push(itemWithPrice);
    }
    return caseItems;
  }

  async fillCases(cases) {
    const response = [];
    for (let index in cases) {
      const caseItems = await db.query(`SELECT * FROM case_items WHERE case_id = $1`, [
        cases[index].id_case,
      ]);
      const items = await this.getCaseDrop(caseItems.rows);
      response.push(new CaseDTO({ ...cases[index], items: [...items] }));
    }

    return response;
  }

  async getAllCases({ group_id }) {
    let cases = [];
    if (!group_id) {
      cases = await db.query(`SELECT * FROM cases`);
    } else {
      cases = await db.query(`SELECT * FROM cases WHERE group_id = $1`, [group_id]);
    }
    const response = await this.fillCases(cases.rows);
    return response;
  }

  async getCaseById({ id }) {
    if (!id) {
      throw ApiError.BadRequest('Поле id не может быть пустым!');
    }
    const caseFromDb = await db.query(`SELECT * FROM cases WHERE id_case = $1`, [id]);
    const caseItems = await db.query(`SELECT * FROM case_items WHERE case_id = $1`, [
      caseFromDb.rows[0].id_case,
    ]);
    const items = await this.getCaseDrop(caseItems.rows);

    return { ...caseFromDb.rows[0], items: [...items] };
  }

  async openCase({ id_case, id_account }) {
    if (!id_case) {
      throw ApiError.BadRequest('Поле id_case не может быть пустым!');
    }

    const caseFromDb = await db.query(`SELECT * FROM cases WHERE id_case = $1`, [id_case]);
    const caseDrop = await this.fillCases([caseFromDb.rows[0]]).then((response) => {
      return response[0];
    });

    let sumWeight = 0;
    const coef = 1; // TODO: Заменить на коеффициент аккаунта

    let caseStocks = caseDrop.items;

    for (let index in caseStocks) {
      caseStocks[index].weight = Math.pow(
        1 / Math.abs(caseStocks[index].price - caseDrop.price),
        coef,
      );
      sumWeight += caseStocks[index].weight;
    }

    for (let index in caseStocks) {
      caseStocks[index].chance = caseStocks[index].weight / sumWeight;
    }

    caseStocks = caseStocks.sort((a, b) => {
      return a.chance > b.chance ? -1 : 1;
    });

    const roll = Math.random();
    let cumulative = 0;

    for (let i in caseStocks) {
      cumulative += caseStocks[i].chance;
      if (roll < cumulative) {
        return caseStocks[i];
        break;
      }
    }
  }

  async createCase({ items, name, price, sale_price, group_id }) {
    if (!name) {
      throw ApiError.BadRequest('Название не может быть пустым!');
    }

    if (!price) {
      throw ApiError.BadRequest('Цена не может быть пустой!');
    }

    if (!this.isNumber(price)) {
      throw ApiError.BadRequest('Цена должна быть числом!');
    }

    if (!group_id) {
      throw ApiError.BadRequest('Название не может быть пустым!');
    }

    if (!items) {
      throw ApiError.BadRequest('В кейсе не может быть ни одного предмета!');
    }

    const newCase = await db.query(
      `INSERT INTO cases(name, price, group_id, sale_price) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, price, group_id, sale_price],
    );
    let caseItems = [];
    console.log('items', items);
    for (let index in items) {
      console.log('index', index);
      const newCaseItem = await db.query(
        `INSERT INTO case_items(case_id, stock_id) VALUES ($1, $2) RETURNING *`,
        [newCase.rows[0].id_case, items[index]],
      );
      const itemFromDrop = await db.query(`SELECT * FROM stocks WHERE id_stock = $1`, [
        items[index],
      ]);
      caseItems.push(itemFromDrop.rows[0]);
    }

    return { ...newCase.rows[0], items: [...caseItems] };
  }

  async createCaseGroup({ name }) {
    if (!name) {
      throw ApiError.BadRequest('Название не может быть пустым!');
    }

    const checkGroup = await db.query(`SELECT * FROM case_groups WHERE name = $1`, [name]);

    if (checkGroup.rows.length !== 0) {
      throw ApiError.BadRequest('Группа с таким названием уже существует!');
    }

    const groupsFromDb = await db.query(`SELECT * FROM case_groups`);

    const position = groupsFromDb.rows.length !== 0 ? groupsFromDb.rows.length + 1 : 1;

    const group = await db.query(
      `INSERT INTO case_groups(name, position) VALUES ($1, $2) RETURNING *`,
      [name, position],
    );

    return group.rows[0];
  }

  async getCaseGroups() {
    const groups = await db.query(`SELECT * FROM case_groups`);
    return groups.rows.sort((a, b) => {
      return a.id_group === 0 ? 1 : -1;
    });
  }

  async editCaseGroup({ name, id_group }) {
    const edited = await db.query(
      `UPDATE case_groups SET name = $1 WHERE id_group = $2 RETURNING *`,
      [name, id_group],
    );
    return edited.rows[0];
  }

  async editCase() {}

  async deleteCase({ id }) {
    const caseItems = await db.query(`DELETE FROM case_items WHERE case_id = $1`, [id]);
    const deleted = await db.query(`DELETE FROM cases WHERE id_case = $1 RETURNING *`, [id]);
    return { ...deleted.rows[0], items: [...caseItems.rows] };
  }

  async deleteCaseGroup({ id_group }) {
    const changed = await db.query(
      `UPDATE cases SET group_id = 0 WHERE group_id = $1 RETURNING *`,
      [id_group],
    );
    console.log('changed', changed.rows);
    const deleted = await db.query(`DELETE FROM case_groups WHERE id_group = $1`, [id_group]);

    return deleted.rows[0];
  }
}

module.exports = new CaseService();
