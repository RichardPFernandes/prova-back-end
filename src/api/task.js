const controller = require("../controller/task");
class TaskApi {
  async criarTask(req, res) {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const idProjeto = req.body.idProjeto;
    const idUsuario = req.userId;
    try {
      const task = await controller.criarTask(
        titulo,
        descricao,
        idProjeto,
        idUsuario
      );
      return res.status(201).send(task);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  async alterarTask(req, res) {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const idUsuario = req.userId;
    const status = req.body.status;
    const dataConclusao = req.body.dataConclusao;

    try {
      const task = await controller.alterarTask(
        Number(id),
        titulo,
        descricao,
        idUsuario,
        status,
        dataConclusao
      );
      return res.status(200).send(task);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  async deletarTask(req, res) {
    const { id } = req.params;
    const idUsuario = req.userId;

    try {
      await controller.deletarTask(Number(id), idUsuario);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  async listarTasks(req, res) {
    try {
      const idProjeto = req.query.idProjeto;
      const idUsuario = req.userId;
      const tasks = await controller.listarTasks(idProjeto, idUsuario);
      return res.status(200).send(tasks);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new TaskApi();
