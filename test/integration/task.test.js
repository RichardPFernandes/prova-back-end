const controller = require("../../src/controller/task");
const User = require("../../src/model/user");
const Project = require("../../src/model/project");
const database = require("../../src/config/database");

describe("Task", () => {
  let user;
  let project;
  beforeAll(async () => {
    this.transaction = await database.db.transaction();

    user = await User.create(
      {
        nome: "Fulano",
        email: "testetask@gmail.com",
        senha: "123456",
      },
    );


    try {
      const obj = {
        nome: "Projeto Teste Task",
        descricao: "TESTE TASK",
        id_usuario: user.id
      }
      project = await Project.create(
        obj,
      );
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    database.db.query("DELETE FROM tasks");
    database.db.query("DELETE FROM projects");
    database.db.query("DELETE FROM users");

    await this.transaction.commit();
  });




  it("Criar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      project.id,
      user.id
    );

    expect(task.titulo).toBe("Task Teste");
  });

  it("Alterar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      project.id,
      user.id
    );

    const taskAlterada = await controller.alterarTask(
      task.id,
      "Task Alterada",
      "Task de teste",
      project.id,
      user.id,
    );

    expect(taskAlterada.titulo).toBe("Task Alterada");
  });

  it("Deletar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      project.id,
      user.id
    );

    await controller.deletarTask(task.id, user.id);

    try {
      await controller.buscarTask(task.id, project.id);
    } catch (error) {
      expect(error.message).toBe("Task não encontrado");
    }
  });

  it("Listar Tasks", async () => {
    await controller.criarTask("Task Teste", "Task de teste", project.id, user.id);

    const tasks = await controller.listarTasks(project.id, user.id, null);

    expect(tasks).toBeTruthy();
  });
});
