const supertest = require("supertest");
const app = require("../app");

const req = supertest(app);

let id = null;

describe("API Loja Virtual", () => {
    test("201 POST /produtos", async () => {
        const res = await req
            .post("/produtos")
            .send({ nome: "nome", preco: 1 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("produto._id");
        id = res.body._id;
    });
});
