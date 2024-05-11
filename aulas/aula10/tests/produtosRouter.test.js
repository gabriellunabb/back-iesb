const supertest = require("supertest");
const app = require("../app");

const req = supertest(app);

let id = "663e9fb245e710a4eb9eeea5";

describe("API Loja Virtual", () => {
    // test("201 POST /produtos", async () => {
    //     const res = await req
    //         .post("/produtos")
    //         .send({ nome: "nome", preco: 1 });
    //     expect(res.status).toBe(201);
    //     expect(res.body).toHaveProperty("produto._id");
    //     id = res.body._id;
    // });

    test("422 POST /produtos", async () => {
        const res = await req.post("/produtos").send({});
        expect(res.status).toBe(422);
        expect(res.body).toHaveProperty("msg");
    });

    test("200 GET /produtos", async () => {
        const res = await req.get("/produtos");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        if (res.body.length) id = res.body[0]._id.toString();
    });

    test("200 GET /produtos/:id", async () => {
        const res = await req.get(`/produtos/${id}`);
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
    });

    test("404 GET /produtos/:id", async () => {
        const res = await req.get("/produtos/000000000000000000000000");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("msg");
    });
});
