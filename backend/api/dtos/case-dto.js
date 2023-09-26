module.exports = class CaseDTO {
  id_case;
  name;
  price;
  group_id;
  items;

  constructor(model) {
    this.id_case = model.id_case;
    this.name = model.name;
    this.price = model.price;
    this.group_id = model.group_id;
    this.items = model.items;
  }
};
