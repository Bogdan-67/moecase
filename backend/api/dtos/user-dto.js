module.exports = class UserDTO {
  id_account;
  username;
  email;
  login;
  role;
  img;

  constructor(model) {
    this.id_account = model.id_account;
    this.username = model.username;
    this.email = model.email;
    this.login = model.login;
    this.role = model.role_name;
    this.img = model.img;
  }
};
