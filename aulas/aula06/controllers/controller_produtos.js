const produtos = [];

function listarTodos(req, res) {
    res.json(produtos);
}

function exibir(req, res) {
    const { produto } = req;
    res.json(produto);
}

function validarDados(req, res, next) {
    var { nome, preco } = req.body;
    if (!nome || !preco) {
        res.status(422).json({ msg: "Entrada inválida" });
    } else {
        next();
    }
}

function buscarPeloId(req, res, next) {
    var produto = produtos.find((p) => p.id == req.params.id);
    if (!produto) {
        res.status(404).json({ msg: "Produto não encontrado" });
    }

    req.produto = produto;
    next();
}

function criar(req, res) {
    var { nome, preco } = req.body;
    var produto = { id: produtos.length + 1, nome, preco };
    produtos.push(produto);
    res.status(201).json(produto);
}

function editar(req, res) {
    var { nome, preco } = req.body;
    const { produto } = req;
    produto.nome = nome;
    produto.preco = preco;
    res.json(produto);
}

function apagar(req, res) {
    const { produto } = req;

    produtos.splice(produtos.indexOf(produto), 1);
    res.status(204).end();
}

module.exports = {
    apagar,
    buscarPeloId,
    criar,
    editar,
    listarTodos,
    exibir,
    validarDados,
};
