const app = require("../../src/index");
const request = require("supertest");
const Project = require("../../src/model/project");

describe("Task", () => {
    let project;

    beforeAll(async () => {
         const user = await request(app).post("/api/v1/user").send({
            nome: "Fulano",
            email: "fernandesrichardtestetask@gmail.com",
            senha: "123456",
          });
      
          const response = await request(app).post("/api/v1/user/login").send({
            email: "fernandesrichardtestetask@gmail.com",
            senha: "123456",
          });
      
          this.token = response.body.token;

          project = await Project.create({
            nome: "Projeto Teste",
            descricao: "Projeto de teste",
            id_usuario: user.body.id,
        });
    });


    it("Criar Task", async () => {
        const response = await request(app).post("/api/v1/task").send({
            titulo: "Task Teste",
            descricao: "Task de teste",
            idProjeto: project.id,
        }).set("Authorization", `Bearer ${this.token}`);

        expect(response.status).toBe(201);
        expect(response.body.titulo).toBe("Task Teste");
    });

    it("Alterar Task", async () => {
        const response = await request(app).post("/api/v1/task").send({
            titulo: "Task Teste",
            descricao: "Task de teste",
            idProjeto: project.id,
        }).set("Authorization", `Bearer ${this.token}`);

        const responseAlterado = await request(app)
            .put(`/api/v1/task/${response.body.id}`)
            .send({
                titulo: "Task Alterada",
                descricao: "Task de teste",
                status: "concluido",
                dataConclusao: "2024-03-01",
                idProjeto: project.id,
            }).set("Authorization", `Bearer ${this.token}`);

        expect(responseAlterado.status).toBe(200);
        expect(responseAlterado.body.titulo).toBe("Task Alterada");
    });

    it("Deletar Task", async () => {
        const response = await request(app).post("/api/v1/task").send({
            titulo: "Task Teste",
            descricao: "Task de teste",
            idProjeto: project.id,
        }).set("Authorization", `Bearer ${this.token}`);

        const responseDeletado = await request(app).delete(
            `/api/v1/task/${response.body.id}`
        ).set("Authorization", `Bearer ${this.token}`);

        expect(responseDeletado.status).toBe(204);
    });

    it("Listar Tasks", async () => {
        await request(app).post("/api/v1/task").send({
            titulo: "Task Teste",
            descricao: "Task de teste",
            idProjeto: project.id,
        }).set("Authorization", `Bearer ${this.token}`);
        const response = await request(app).get("/api/v1/task").query({ idProjeto: project.id }).set("Authorization", `Bearer ${this.token}`);

        expect(response.status).toBe(200);
    });
    

});
