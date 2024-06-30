const controller = require("../../src/controller/task");
const User = require("../../src/model/user");
const Project = require("../../src/model/project");
const database = require("../../src/config/database");

describe("Task", () => {
  beforeAll(async () => {
    this.transaction = await database.db.sequelize.transaction();

    await User.Create(
      {
        nome: "Fulano",
        email: "fernandesrichard312@gmail.com",
        senha: "123456",
      },
      this.transaction
    );

    await Project.Create(
      {
        nome: "Projeto Teste",
        descricao: "Projeto de teste",
        id_usuario: 0,
      },
      this.transaction
    );
  });

  afterAll(async () => {
    await this.transaction.rollback();
  });

  afterEach(async () => {
    await database.db.sequelaize.query("DELETE FROM tarefas", {
      transaction: this.transaction,
    });
  });

  it("Criar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      0,
      0
    );

    expect(task.nome).toBe("Task Teste");
  });

  it("Alterar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      0,
      0
    );

    const taskAlterada = await controller.alterarTask(
      task.id,
      "Task Alterada",
      "Task de teste",
      0,
      0
    );

    expect(taskAlterada.nome).toBe("Task Alterada");
  });

  it("Deletar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      0,
      0
    );

    await controller.deletarTask(task.id, 0);

    try {
      await controller.buscarTask(task.id, 0);
    } catch (error) {
      expect(error.message).toBe("Projeto não encontrado");
    }
  });

  it("Listar Tasks", async () => {
    await controller.criarTask("Task Teste", "Task de teste", 0, 0);

    const tasks = await controller.listarTasks(0, 0, null);

    expect(tasks.length).toBe(1);
  });
});
