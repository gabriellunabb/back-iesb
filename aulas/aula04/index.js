const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(new Date());
    next();
});

app.get("/", (req, res) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    console.log(req.params);
    console.log(req.body);
    res.status(201).send("ok");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.status(201).json({ message: "sucesso" });
});

app.put("/", (req, res) => {
    res.status(204).end();
});

app.delete("/", (req, res) => {
    throw new Error("Errou!");
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(400).send("ERRO!!")
});

app.listen(3000, () => console.log("API esta ON!"));

module.exports = app;