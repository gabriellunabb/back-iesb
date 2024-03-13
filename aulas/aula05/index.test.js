const supertest = require("supertest");

const app = require("./index");

const req = supertest(app);

describe("Testes da API", () => {
    test("Deve retornar 200 e um JSON no GET /produtos", async () => {
        const res = await req.get("/produtos");
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 200 e um JSON no GET /produtos/{id}", async () => {
        const res = await req.get("/produtos/1");
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 404 e um JSON no GET /produtos/{id}", async () => {
        const res = await req.get("/produtos/999");
        expect(res.status).toBe(404);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 201 e um JSON no POST /produtos", async () => {
        const res = await req
            .post("/produtos")
            .send({ nome: "Banana", preco: 10.0 });
        expect(res.status).toBe(201);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 422 e um JSON no POST /produtos", async () => {
        const res = await req.post("/produtos").send({});
        expect(res.status).toBe(422);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 200 e um JSON no PUT /produtos/{id}", async () => {
        const res = await req
            .put("/produtos/1")
            .send({ nome: "Uva", preco: 15.0 });
        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 404 e um JSON no PUT /produtos/{id}", async () => {
        const res = await req
            .put("/produtos/999")
            .send({ nome: "Uva", preco: 15.0 });
        expect(res.status).toBe(404);
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("Deve retornar 204 e um JSON no DELETE /produtos/{id}", async () => {
        const res = await req.delete("/produtos/1");
        expect(res.status).toBe(204);
        expect(res.body).toBe({});
    });

    test("Deve retornar 404 e um JSON no DELETE /produtos/{id}", async () => {
        const res = await req.delete("/produtos/999");
        expect(res.status).toBe(404);
        expect(res.headers["content-type"]).toMatch(/json/);
    });
});
