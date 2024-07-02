const database = require("../config/database");

class Project {
  constructor() {
    this.model = database.db.define("project", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
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
      id_usuario: {
        type: database.db.Sequelize.INTEGER,
        allowNull: false,
      },
    });
  }
}

module.exports = (new Project()).model;
