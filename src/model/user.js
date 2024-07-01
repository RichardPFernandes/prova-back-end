const database = require("../config/database");

class User {
  constructor() {
    this.model = database.db.define("user", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      data_criacao: {
        type: database.db.Sequelize.DATE,
        allowNull: false,
        defaultValue: database.db.Sequelize.NOW,
      },
    });
  }
}

module.exports = (new User()).model;
