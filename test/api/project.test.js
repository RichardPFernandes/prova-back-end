const app = require("../../src/index");
const request = require("supertest");

describe("Project", () => {
  it("Criar projeto", async () => {
    const usuario = await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandesrichard312@gmail.com",
      senha: "123456",
    });
    const response = await request(app).post("/api/v1/project").send({
      nome: "Projeto Teste",
      descricao: "Projeto de teste",
      idUsuario: usuario.body.id,
    });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe("Projeto Teste");
  });
  it("Alterar projeto", async () => {
    const response = await request(app).post("/api/v1/project").send({
      nome: "Projeto Teste",
      descricao: "Projeto de teste",
      idUsuario: 1,
    });

    const responseAlterado = await request(app)
      .put(`/api/v1/project/${response.body.id}`)
      .send({
        nome: "Fulano de Tal",
        email: "fernandes312richard@gmail.com",
        senha: "123456",
      });

    expect(responseAlterado.status).toBe(200);
    expect(responseAlterado.body.nome).toBe("Fulano de Tal");
  });
  it("Deletar projeto", async () => {
    const response = await request(app).post("/api/v1/project").send({
      nome: "Fulano",
      email: "fernandes324richard@gmail.com",
      senha: "123456",
    });

    console.log(response.body);
    const responseDeletado = await request(app).delete(
      `/api/v1/project/${response.body.id}`
    );

    expect(responseDeletado.status).toBe(204);
  });
});
