const app = require("../../src/index");
const request = require("supertest");

describe("User", () => {
  beforeAll(async () => {
    await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandesrichardtestelogin@gmail.com",
      senha: "123456",
    });

    const response = await request(app).post("/api/v1/user/login").send({
      email: "fernandesrichardtestelogin@gmail.com",
      senha: "123456",
    });

    this.token = response.body.token;
    
  });
  it("Criar usuário", async () => {
    const response = await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandesrichard@gmail.com",
      senha: "123456",
    });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe("Fulano");
    expect(response.body.email).toBe("fernandesrichard@gmail.com");
  });
  
  it("Alterar usuário", async () => {
    // use this.token
    const response = await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandesrichard312@gmail.com",
      senha: "123456",
    })

    const responseAlterado = await request(app)
      .put(`/api/v1/user/${response.body.id}`)
      .set("Authorization", `Bearer ${this.token}`)
      .send({
        nome: "Fulano de Tal",
        email: "fernandesrichard312@gmail.com",
        senha: "123456",
      });

    expect(responseAlterado.status).toBe(200);
    expect(responseAlterado.body.nome).toBe("Fulano de Tal");
  });
  it("Deletar usuário", async () => {
    const response = await request(app).post("/api/v1/user").send({
      nome: "Fulano",
      email: "fernandes324richard@gmail.com",
      senha: "123456",
    });

    const responseDeletado = await request(app)
      .delete(`/api/v1/user/${response.body.id}`)
      .set("Authorization", `Bearer ${this.token}`);
  

    expect(responseDeletado.status).toBe(204);
  });
  it("Deletar Usuário inexistente", async () => {
    const response = await request(app).delete(`/api/v1/user/999`).set("Authorization", `Bearer ${this.token}`);
    expect(response.status).toBe(400);
  });
});
