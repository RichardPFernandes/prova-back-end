const controller = require("../../src/controller/user");
const database = require("../../src/config/database");

describe("User", () => {
  beforeAll(async () => {
    this.transaction = await database.db.transaction();
  });

  afterAll(async () => {
    await this.transaction.rollback();
  });

  afterEach(async () => {
    await database.db.query("DELETE FROM users", {
      transaction: this.transaction,
    });
  });
  


  it("Criar usuário", async () => {
    const user = await controller.criarUsuario(
      "Fulano",
      "fernandesrichard@gmail.com",
      "123456"
    );

    expect(user.nome).toBe("Fulano");
    expect(user.email).toBe("fernandesrichard@gmail.com");
    expect(user.senha).not.toBe("123456");
  });

  it("Alterar usuário", async () => {
    const user = await controller.criarUsuario(
      "Fulano",
      "fernandes312richard@gmail.com",
      "123456"
    );

    const userAlterado = await controller.alterarUsuario(
      user.id,
      "Fulano de Tal",
      "fernandes312richard@gmail.com",
      "123456"
    );

    expect(userAlterado.nome).toBe("Fulano de Tal");
  });

  it("Deletar usuário", async () => {
    const user = await controller.criarUsuario(
      "Fulano",
      "fernandes324richard@gmail.com",
      "123456"
    );

    await controller.deletarUsuario(user.id);

    try {
      await controller.buscarPorId(user.id);
    } catch (error) {
      expect(error.message).toBe("Usuário não encontrado");
    }
  });

  it("Login usuário", async () => {
    const user = await controller.criarUsuario(
      "Fulano",
      "fernandes344richard@gmail.com",
      "123456"
    );

    const userLogado = await controller.login(user.email, "123456");

    expect(userLogado.nome).toBe("Fulano");
    expect(userLogado.email).toBe("fernandes344richard@gmail.com");
    expect(userLogado.senha).not.toBe("123456");
  });
});
