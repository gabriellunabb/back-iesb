const express = require("express");
const app = express();
const routerProdutos = require("./router");

app.use(routerProdutos);

app.listen(3000, () => console.log("API esta ON!"));

module.exports = app;
