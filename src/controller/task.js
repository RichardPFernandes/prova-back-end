const Task = require("../model/task");
const ProjectController = require("./project");
class TaskController {
  async criarTask(titulo, descricao, idProjeto, idUsuario) {
    this.validaCampos(titulo, descricao);
    ProjectController.buscarProjeto(idProjeto, idUsuario);
    return await Task.create({
      titulo,
      descricao,
      id_projeto: idProjeto,
    });
  }

  async alterarTask(id, titulo, descricao, idUsuario, status, dataConclusao) {
    this.validaCampos(titulo, descricao);
    this.buscarTask(id, idUsuario);
    return await Task.update(
      { titulo, descricao, status, dataConclusao },
      { where: { id } }
    );
  }

  async deletarTask(id, idUsuario) {
    this.buscarTask(id, idUsuario);
    await Task.destroy({ where: { id } });
  }

  async listarTasks(idProjeto, idUsuario, status) {
    if (idUsuario === undefined || idProjeto === undefined) {
      throw new Error("Id do usuário é obrigatório");
    }
    if (status) {
      return await Task.findAll({
        where: { id_projeto: idProjeto, id_usuario: idUsuario, status },
      });
    }
    return await Task.findAll({
      where: { id_projeto: idProjeto, id_usuario: idUsuario },
    });
  }

  async buscarTask(id, idUsuario) {
    if (idUsuario === undefined || id === undefined) {
      throw new Error("Id do usuário e da task são obrigatórios");
    }
    const task = await Task.findOne({ where: { id, id_usuario: idUsuario } });
    if (!task) {
      throw new Error("Task não encontrado");
    }
    return task;
  }

  validaCampos(titulo, descricao) {
    if (titulo === undefined || descricao === undefined) {
      throw new Error("Titulo e Descrição são obrigatórios");
    }
  }
}

module.exports = new TaskController();
