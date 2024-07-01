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
      this.transaction
    );
    try {
      project = await Project.create(
        {
          nome: "Projeto Teste Task",
          descricao: "TESTE TASK",
          id_usuario: user.id
        },
        this.transaction
      );
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await this.transaction.rollback();
  });

  afterEach(async () => {
    await database.db.query("DELETE FROM tasks", {
      transaction: this.transaction,
    });
  });


  it("Criar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      project.id,
      user.id
    );

    expect(task.nome).toBe("Task Teste");
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

    expect(taskAlterada.nome).toBe("Task Alterada");
  });

  it("Deletar Task", async () => {
    const task = await controller.criarTask(
      "Task Teste",
      "Task de teste",
      project.id,
      user.id
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
