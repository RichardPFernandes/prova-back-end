const Project = require("../model/project");
const UserController = require("./user");

class ProjectController {
  async criarProjeto(nome, descricao, idUsuario) {
    this.validaCampos(nome, descricao);
    UserController.buscarPorId(idUsuario);

    return await Project.create({ nome, descricao, id_usuario: idUsuario });
  }

  async alterarProjeto(id, nome, descricao, idUsuario) {
    this.validaCampos(nome, descricao);
    this.buscarProjeto(id, idUsuario);
    return await Project.update({ nome, descricao }, { where: { id } });
  }

  async deletarProjeto(id, idUsuario) {
    this.buscarProjeto(id, idUsuario);
    await Project.destroy({ where: { id } });
  }

  async listarProjetos(idUsuario) {
    if (idUsuario === undefined) {
      throw new Error("Id do usuário é obrigatório");
    }
    return await Project.findAll({ where: { id_usuario: idUsuario } });
  }

  async buscarProjeto(id, idUsuario) {
    const projeto = await Project.findOne({
      where: { id, id_usuario: idUsuario },
    });
    if (!projeto) {
      throw new Error("Projeto não encontrado");
    }
    return projeto;
  }

  validaCampos(nome, descricao) {
    if (nome === undefined || descricao === undefined) {
      throw new Error("Nome e descrição são obrigatórios");
    }

    if (nome.length > 100) {
      throw new Error("Nome deve ter no máximo 100 caracteres");
    }
  }
}

module.exports = new ProjectController();
