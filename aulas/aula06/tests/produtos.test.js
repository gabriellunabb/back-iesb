const supertest = require("supertest");

const app = require("../app");

const req = supertest(app);

describe("Teste da API Produtos", () => {
    it("POST / deve retornar 201", async () => {
        var entrada = { nome: "nome", preco: 10 };
        var res = await req.post("/produtos").send(entrada);
        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("nome", entrada.nome);
        expect(res.body).toHaveProperty("preco", entrada.preco);
    });

    it("POST / deve retornar 422", async () => {
        var res = await req.post("/produtos");
        expect(res.status).toBe(422);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("msg", "Entrada inválida");
    });

    it("GET / deve retornar 200", async () => {
        var res = await req.get("/produtos");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("GET /id deve retornar 200", async () => {
        var res = await req.get("/produtos/1");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("nome");
        expect(res.body).toHaveProperty("preco");
    });

    it("GET /id deve retornar 404", async () => {
        var res = await req.get("/produtos/999");
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("msg", "Produto não encontrado");
    });

    it("PUT /id deve retornar 200", async () => {
        var entrada = { nome: "nome2", preco: 11 };
        var res = await req.put("/produtos/1").send(entrada);
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("nome", entrada.nome);
        expect(res.body).toHaveProperty("preco", entrada.preco);
    });

    it("PUT /id deve retornar 422", async () => {
        var res = await req.put("/produtos/1").send({});
        expect(res.status).toBe(422);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("msg", "Entrada inválida");
    });

    it("PUT /id deve retornar 404", async () => {
        var entrada = { nome: "nome2", preco: 11 };
        var res = await req.put("/produtos/999").send(entrada);
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("msg", "Produto não encontrado");
    });

    it("DELETE /id deve retornar 204", async () => {
        var res = await req.delete("/produtos/1");
        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });

    it("DELETE /id deve retornar 404", async () => {
        var res = await req.delete("/produtos/999");
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveProperty("msg", "Produto não encontrado");
    });
});
