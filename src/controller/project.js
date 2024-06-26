const Project = require("../model/project");
const UserController = require("./user");

class ProjectController {
  async criarProjeto(nome, descricao, idUsuario) {
    this.validaCampos(nome, descricao);
    await UserController.buscarPorId(idUsuario);
    const projeto = await Project.create({
      nome,
      descricao,
      id_usuario: idUsuario,
    });
    return projeto;
  }

  async alterarProjeto(id, nome, descricao, idUsuario) {
    this.validaCampos(nome, descricao);
    const projeto = await this.buscarProjeto(id, idUsuario);
    projeto.nome = nome;
    projeto.descricao = descricao;
    await projeto.save();
    return projeto;
  }

  async deletarProjeto(id, idUsuario) {
    const projeto = await this.buscarProjeto(id, idUsuario);
    await projeto.destroy();
  }

  async listarProjetos(idUsuario) {
    if (idUsuario === undefined) {
      throw new Error("Id do usuário é obrigatório");
    }

    const projetos = await Project.findAll({ where: { id_usuario: idUsuario } })

    if (!projetos) {
      throw new Error("Projetos não encontrados");
    }
    return projetos;
  }

  async buscarProjeto(id, idUsuario) {
    const projeto = await Project.findOne({
      where: { id: id, id_usuario: idUsuario },
    });
    if (!projeto) {
      throw new Error("Projeto não encontrado");
    }
    return projeto;
  }

  validaCampos(nome, descricao) {
    if (nome === undefined || descricao === undefined || nome === "" || descricao === "") {
      throw new Error("Nome e descrição são obrigatórios");
    }

    if (nome.length > 100) {
      throw new Error("Nome deve ter no máximo 100 caracteres");
    }
  }
}

module.exports = new ProjectController();
