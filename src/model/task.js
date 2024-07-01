const database = require("../config/database");

class Task {
  constructor() {
    this.model = database.db.define("task", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        length: 100,
      },
      descricao: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      data_criacao: {
        type: database.db.Sequelize.DATE,
        allowNull: false,
        defaultValue: database.db.Sequelize.NOW,
      },
      status: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendente",
      },
      data_conclusao: {
        type: database.db.Sequelize.DATE,
        allowNull: true,
      },
      id_projeto: {
        type: database.db.Sequelize.INTEGER,
        allowNull: false,
      },
    });
  }
}

module.exports = (new Task()).model;
