const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/users");

function cifrarSenha(senha, salt) {
    const hash = crypto.createHmac("sha256", salt);
    hash.update(senha);
    return hash.digest("hex");
}

async function criar(req, res) {
    const salt = crypto.randomBytes(16).toString("hex");
    const senhaCifrada = cifrarSenha(req.body.senha, salt);
    const novoUsuario = await Usuario.create({
        email: req.body.email,
        senha: senhaCifrada,
        salt,
    });
    res.status(201).json({
        id: novoUsuario._id,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
        salt: novoUsuario.salt,
    });
}

async function entrar(req, res) {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (usuario) {
        if (usuario.senha === cifrarSenha(req.body.senha, usuario.salt))
            res.json({
                token: jwt.sign({ email: usuario.email }, "123", {
                    expiresIn: "1m",
                }),
            });
        else res.status(401).json({ msg: "acesso negado" });
    } else res.status(400).json({ msg: "credenciais invalidas" });
}

module.exports = { criar, entrar };
