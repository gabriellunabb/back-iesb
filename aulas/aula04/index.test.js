const supertest = require("supertest");

const app = require("./index");

const req = supertest(app);

test("Deve retornar 201 no GET", async () => {
    const res = await req.get("/");
    expect(res.status).toBe(201);
});

test("Deve retornar 204 no PUT", async () => {
    const res = await req.put("/");
    expect(res.status).toBe(204);
});

test("Deve retornar 400 no DELETE", async () => {
    const res = await req.delete("/");
    expect(res.status).toBe(400);
});