const controller = require("../../src/controller/project");
const User = require("../../src/model/user");
const database = require("../../src/config/database");

describe("Project", () => {
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
  });

  afterAll(async () => {
    await this.transaction.rollback();
  });

  afterEach(async () => {
    await database.db.sequelize.query("DELETE FROM projetos", {
      transaction: this.transaction,
    });
  });

  it("Criar Projeto", async () => {
    const projeto = await controller.criarProjeto(
      "Projeto Teste",
      "Projeto de teste",
      0
    );

    expect(projeto.nome).toBe("Projeto Teste");
  });

  it("Alterar Projeto", async () => {
    const projeto = await controller.criarProjeto(
      "Projeto Teste",
      "Projeto de teste",
      0
    );

    const projetoAlterado = await controller.alterarProjeto(
      projeto.id,
      "Projeto Alterado",
      "Projeto de teste",
      0
    );

    expect(projetoAlterado.nome).toBe("Projeto Alterado");
  });

  it("Deletar Projeto", async () => {
    const projeto = await controller.criarProjeto(
      "Projeto Teste",
      "Projeto de teste",
      0
    );

    await controller.deletarProjeto(projeto.id, 0);

    try {
      await controller.buscarProjeto(projeto.id, 0);
    } catch (error) {
      expect(error.message).toBe("Projeto não encontrado");
    }
  });

  it("Listar Projetos", async () => {
    await controller.criarProjeto("Projeto Teste", "Projeto de teste", 0);

    const projetos = await controller.listarProjetos(0);

    expect(projetos.length).toBe(1);
  });
});
