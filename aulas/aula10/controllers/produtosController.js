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

async function buscarPorId(req, res, next) {
    try {
        const produto = await Produto.findById(req.params.id);
        if (produto) {
            req.produto = produto;
            next();
        } else {
            res.status(404).json({ msg: "Não encontrado!" });
        }
    } catch (e) {
        res.status(400).json({ msg: "Id invalido!" });
    }
}

async function buscar(req, res) {
    res.json(req.produto);
}

async function atualizar(req, res) {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body);
    res.json(produto);
}

async function deletar(req, res) {
    await Produto.deleteOne({ _id: req.params.id });
    res.status(204).send();
}

module.exports = {
    validarDados,
    criar,
    buscarTodos,
    buscarPorId,
    atualizar,
    deletar,
    buscar,
};
