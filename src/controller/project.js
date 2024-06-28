const Project = require("../model/project");
const UserController = require("./user");

class ProjetctController {
  async criarProjeto(nome, descricao, idUsuario) {
    this.validaCampos(nome, descricao);
    UserController.buscarPorId(idUsuario);

    return await Project.create({ nome, descricao, idUsuario });
  }

  async alterarProjeto(id, nome, descricao) {
    this.validaCampos(nome, descricao);
    UserController.buscarPorId(idUsuario);
    this.buscarProjeto(id);
    return await Project.update({ nome, descricao }, { where: { id } });
  }

  async deletarProjeto(id) {
    this.buscarProjeto(id);
    await Project.destroy({ where: { id } });
  }

  async listarProjetos(idUsuario) {
    if (idUsuario === undefined) {
      throw new Error("Id do usuário é obrigatório");
    }
    return await Project.findAll({ where: { id_usuario: idUsuario } });
  }

  async buscarProjeto(id) {
    const projeto = await Project.findByPk(id);
    if (!projeto) {
      throw new Error("Projeto não encontrado");
    }
    return projeto;
  }

  validaCampos(nome, descricao) {
    if (nome === undefined || descricao === undefined) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}

module.exports = new ProjetctController();
