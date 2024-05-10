const Produto = require("../models/produto");

async function validarDados(req, res, next) {
    const produto = new Produto(req.body);
    try {
        await produto.validate();
        next();
    } catch (e) {
        res.status(422).json({ msg: "Entrada invalida" });
    }
}

async function criar(req, res) {
    const produto = await Produto.create(req.body);
    res.status(201).json({ produto });
}

module.exports = { validarDados, criar };
