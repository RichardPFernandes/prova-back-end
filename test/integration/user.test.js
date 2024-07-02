const controller = require("../../src/controller/user");
const database = require("../../src/config/database");

describe("User", () => {
  beforeAll(async () => {
    this.transaction = await database.db.transaction();
  });

  afterAll(async () => {
    database.db.query("DELETE FROM users");
    this.transaction.commit();
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

  it("Deletar Usuário inexistente", async () => {
    try {
      await controller.deletarUsuario(999);
    } catch (error) {
      expect(error.message).toBe("Usuário não encontrado");
    }
  });

});
