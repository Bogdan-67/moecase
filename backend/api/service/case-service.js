const db = require('../db');
const CaseCardDTO = require('../dtos/caseCard-dto');
const ApiError = require('../exceptions/api-error');

class CaseService {
  async getCaseDrop(items) {
    let caseItems = [];
    for (let index in items) {
      const itemFromDrop = await db.query(`SELECT * FROM drop WHERE id_drop = $1`, [
        items[index].drop_id,
      ]);
      caseItems.push(itemFromDrop.rows[0]);
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
      response.push(new CaseCardDTO({ ...cases[index], items: [...items] }));
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

  async getCasesByGroup({ group_id }) {
    console.log(group_id);
    if (!group_id) {
      console.log('!group_id');
      const cases = await db.query(`SELECT * FROM cases`);
      console.log(cases.rows);
    } else {
      console.log('group_id');
      const cases = await db.query(`SELECT * FROM cases WHERE group_id = $1`, [group_id]);
    }
    const response = await this.fillCases(cases.rows);
    console.log(response);
    return response;
  }

  async getCaseById({ id }) {
    const caseFromDb = await db.query(`SELECT * FROM cases WHERE id_case = $1`, [id]);
    const caseItems = await db.query(`SELECT * FROM case_items WHERE case_id = $1`, [
      caseFromDb.rows[0].id_case,
    ]);
    const items = await this.getCaseDrop(caseItems.rows);

    return { ...caseFromDb.rows[0], items: [...items] };
  }

  async getCasesByGroup({ id }) {
    const casesByGroup = await this.getAllCases();

    return casesByGroup.filter((item) => item.group_id === id);
  }

  async createCase({ items, name, price, group_id }) {
    const newCase = await db.query(
      `INSERT INTO cases(name, price, group_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, price, group_id],
    );
    let caseItems = [];
    console.log('items', items);
    for (let index in items) {
      console.log('index', index);
      const newCaseItem = await db.query(
        `INSERT INTO case_items(case_id, drop_id) VALUES ($1, $2) RETURNING *`,
        [newCase.rows[0].id_case, items[index]],
      );
      const itemFromDrop = await db.query(`SELECT * FROM drop WHERE id_drop = $1`, [items[index]]);
      caseItems.push(itemFromDrop.rows[0]);
    }

    return { ...newCase.rows[0], items: [...caseItems] };
  }

  async createCaseGroup({ name }) {
    if (!name) {
      throw ApiError.BadRequest('Название не может быть пустым!');
    }

    const checkGroup = await db.query(`SELECT * FROM case_groupes WHERE name = $1`, [name]);

    if (checkGroup.rows.length !== 0) {
      throw ApiError.BadRequest('Группа с таким названием уже существует!');
    }

    const groupsFromDb = await db.query(`SELECT * FROM case_groupes`);

    const position = groupsFromDb.rows.length !== 0 ? groupsFromDb.rows.length + 1 : 1;

    const group = await db.query(
      `INSERT INTO case_groupes(name, position) VALUES ($1, $2) RETURNING *`,
      [name, position],
    );

    return group.rows[0];
  }

  async getCaseGroups() {
    const groups = await db.query(`SELECT * FROM case_groupes`);
    return groups.rows;
  }

  async editCaseGroup({ name, id_group }) {
    const edited = await db.query(
      `UPDATE case_groupes SET name = $1 WHERE id_group = $2 RETURNING *`,
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
    const deleted = await db.query(`DELETE FROM case_groupes WHERE id_group = $1`, [id_group]);

    return deleted.rows[0];
  }
}

module.exports = new CaseService();
