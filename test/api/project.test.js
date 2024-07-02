const app = require("../../src/index");
const request = require("supertest");

describe("Project", () => {

  beforeAll(async () => {
    await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandesrichardtesteprojeto@gmail.com",
      senha: "123456",
    });

    const response = await request(app).post("/api/v1/user/login").send({
      email: "fernandesrichardtesteprojeto@gmail.com",
      senha: "123456",
    });

    this.token = response.body.token;
  });

  it("Criar projeto", async () => {
    const response = await request(app).post("/api/v1/project").send({
      nome: "Projeto Teste",
      descricao: "Projeto de teste",
    }).set("Authorization", `Bearer ${this.token}`);
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe("Projeto Teste");
  });
  it("Alterar projeto", async () => {
    const response = await request(app).post("/api/v1/project").send({
      nome: "Projeto Teste",
      descricao: "Projeto de teste",
    }).set("Authorization", `Bearer ${this.token}`);

    const responseAlterado = await request(app)
      .put(`/api/v1/project/${response.body.id}`)
      .send({
        nome: "Projeto Alterado",
        descricao: "Projeto de teste",
      }).set("Authorization", `Bearer ${this.token}`);

    expect(responseAlterado.status).toBe(200);
    expect(responseAlterado.body.nome).toBe("Projeto Alterado");
  });
  it("Deletar projeto", async () => {
    const response = await request(app).post("/api/v1/project").send({
      nome: "Projeto Teste",
      descricao: "Projeto de teste",
    }).set("Authorization", `Bearer ${this.token}`);

    const responseDeletado = await request(app).delete(
      `/api/v1/project/${response.body.id}`
    ).set("Authorization", `Bearer ${this.token}`);

    expect(responseDeletado.status).toBe(204);
  });

  it("Listar projetos", async () => {
    const response = await request(app).get("/api/v1/project").set("Authorization", `Bearer ${this.token}`);
    expect(response.status).toBe(200);
  });
});
