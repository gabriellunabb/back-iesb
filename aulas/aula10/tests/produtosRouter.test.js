const supertest = require("supertest");
const app = require("../app");

const req = supertest(app);

const idInvalido = "err";
const idInexistente = "000000000000000000000000";
var id = "";

describe("API Loja Virtual", () => {
    test("201 POST /produtos", async () => {
        const res = await req
            .post("/produtos")
            .send({ nome: "nome", preco: 1 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("produto._id");
        id = res.body.produto._id.toString();
    });

    test("422 POST /produtos", async () => {
        const res = await req.post("/produtos").send({});
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty("msg");
    });

    test("200 GET /produtos", async () => {
        const res = await req.get("/produtos");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        // if (res.body.length) id = res.body[0]._id.toString();
    });

    test("200 GET /produtos/:id", async () => {
        const res = await req.get(`/produtos/${id}`);
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
    });

    test("400 GET /produtos/:id", async () => {
        const res = await req.get(`/produtos/${idInvalido}`);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    test("404 GET /produtos/:id", async () => {
        const res = await req.get(`/produtos/${idInexistente}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg");
    });

    test("200 PUT /produtos/:id", async () => {
        const res = await req
            .put(`/produtos/${id}`)
            .send({ nome: "nome2", preco: 10 });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("nome");
    });

    test("400 PUT /produtos/:id", async () => {
        const res = await req
            .put(`/produtos/${idInvalido}`)
            .send({ nome: "nome2", preco: 10 });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    test("404 PUT /produtos/:id", async () => {
        const res = await req
            .put(`/produtos/${idInexistente}`)
            .send({ nome: "nome2", preco: 10 });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg");
    });

    test("422 PUT /produtos/:id", async () => {
        const res = await req.put(`/produtos/${id}`);
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty("msg");
    });

    test("204 DELETE /produtos/:id", async () => {
        const res = await req.delete(`/produtos/${id}`);
        expect(res.status).toBe(204);
        expect(res.type).toBe("");
    });

    test("400 DELETE /produtos/:id", async () => {
        const res = await req.delete(`/produtos/${idInvalido}`);
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("msg");
    });

    test("404 DELETE /produtos/:id", async () => {
        const res = await req.delete(`/produtos/${idInexistente}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg");
    });
});
