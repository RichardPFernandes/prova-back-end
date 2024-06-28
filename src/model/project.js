const database = require("../config/database");

class Project {
  constructor() {
    this.model = database.db.define("project", {
      id: {
        type: this.sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: this.sequelize.Sequelize.STRING,
        allowNull: false,
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
      id_usuario: {
        type: this.sequelize.Sequelize.INTEGER,
        allowNull: false,
      },
    });
  }
}

module.exports = new Project().model;
