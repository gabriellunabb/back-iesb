const Usuario = require("../models/users");

async function criar(req, res) {
    const novoUsuario = await Usuario.create(req.body);
    res.status(201).json({ id: novoUsuario._id, email: novoUsuario.email });
}

async function entrar(req, res) {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (usuario) {
        if (usuario.senha === req.body.senha) res.json({ token: "123" });
        else res.status(401).json({ msg: "acesso negado" });
    }
    else res.status(400).json({ msg: "credenciais invalidas" });
}

module.exports = { criar, entrar };
