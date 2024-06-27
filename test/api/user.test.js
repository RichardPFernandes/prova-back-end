const app = require("../../src/index");
const database = require("../../src/config/database");
const request = require("supertest");


describe("User", () => {
    
    it("Criar usuário", async () => {
        const response = await request(app).post("/api/v1/user").send({
            nome: "Fulano",
            email: "fernandesrichard@gmail.com",
            senha: "123456",
        });
        expect(response.status).toBe(201);
        expect(response.body.nome).toBe("Fulano");
        expect(response.body.email).toBe("fernandesrichard@gmail.com");
    }
    );
    it("Alterar usuário", async () => {
        const response = await request(app).post("/api/v1/user").send({
            nome: "Fulano",
            email: "fernandes312richard@gmail.com",
            senha: "123456",
        });

        const responseAlterado = await request(app).put(`/api/v1/user/${response.body.id}`).send({
            nome: "Fulano de Tal",
            email: "fernandes312richard@gmail.com",
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

        console.log(response.body);
        const responseDeletado = await request(app).delete(`/api/v1/user/${response.body.id}`);

        expect(responseDeletado.status).toBe(204);
    });

});
