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

async function buscarTodos(req, res) {
    const produtos = await Produto.find({});
    res.json(produtos);
}

async function buscarPorId(req, res) {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ msg: "Não encontrado!" });
    }
}

module.exports = { validarDados, criar, buscarTodos, buscarPorId };
