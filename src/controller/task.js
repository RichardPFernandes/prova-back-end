const Task = require("../model/task");
const ProjectController = require("./project");
class TaskController {
  async criarTask(titulo, descricao, idProjeto, idUsuario) {
    this.validaCampos(titulo, descricao);
    await ProjectController.buscarProjeto(idProjeto, idUsuario);
    const task = await Task.create({
      titulo,
      descricao,
      id_projeto: idProjeto,
    });
    return task;
  }

  async alterarTask(id, titulo, descricao, idProjeto, idUsuario, status, dataConclusao) {
    this.validaCampos(titulo, descricao);
    await ProjectController.buscarProjeto(idProjeto, idUsuario);
    const task = await this.buscarTask(id, idProjeto);
    task.titulo = titulo;
    task.descricao = descricao;
    task.status = status ? status : task.status;
    task.data_conclusao = dataConclusao;
    await task.save();
    return task;
  }

  async deletarTask(id, idUsuario) {
    
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      throw new Error("Task não encontrada");
    }
    await ProjectController.buscarProjeto(task.id_projeto, idUsuario);
    await Task.destroy({ where: { id } });
  }

  async listarTasks(idProjeto, idUsuario, status) {
    if (idUsuario === undefined || idProjeto === undefined) {
      throw new Error("Id do usuário é obrigatório");
    }
    await ProjectController.buscarProjeto(idProjeto, idUsuario);
    if (status) {
      return await Task.findAll({
        where: { id_projeto: idProjeto, status },
      });
    }
    return await Task.findAll({
      where: { id_projeto: idProjeto },
    });
  }

  async buscarTask(id, idProjeto) {
    if (idProjeto === undefined || id === undefined) {
      throw new Error("Id do usuário e da task são obrigatórios");
    }
    const task = await Task.findOne({ where: { id, id_projeto: idProjeto } });
    if (!task) {
      throw new Error("Task não encontrado");
    }
    return task;
  }

  validaCampos(titulo, descricao) {
    if (titulo === undefined || descricao === undefined || titulo === "" || descricao === "") {
      throw new Error("Titulo e Descrição são obrigatórios");
    }

    if (titulo.length > 100) {
      throw new Error("Titulo deve ter no máximo 100 caracteres");
    }
  }
}

module.exports = new TaskController();
