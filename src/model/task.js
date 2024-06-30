const database = require("../config/database");

class Task {
  constructor() {
    this.model = database.db.define("task", {
      id: {
        type: this.sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: this.sequelize.Sequelize.STRING,
        allowNull: false,
        length: 100,
      },
      descricao: {
        type: this.sequelize.Sequelize.STRING,
        allowNull: false,
      },
      data_criacao: {
        type: this.sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: this.sequelize.Sequelize.NOW,
      },
      status: {
        type: this.sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendente",
      },
      data_conclusao: {
        type: this.sequelize.Sequelize.DATE,
        allowNull: true,
      },
      id_projeto: {
        type: this.sequelize.Sequelize.INTEGER,
        allowNull: false,
      },
    });
  }
}

module.exports = new Task().model;
