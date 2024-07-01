const Sequelize = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize("provajackson", "postgres", "123456", {
      host: "localhost",
      dialect: "postgres",
    });
  }
}

module.exports = new Database();
