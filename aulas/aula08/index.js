//
// Criar uma base de dados do Mongo:
//
// https://www.mongodb.com/ -> Criar conta
//
// Create deployment -> Free -> Create
//
// Criar usuário, nome e senha facil -> Create database user
//
// Choose a connection method -> La embaixo Close
//
// npm init -y
// npm install mongodb
const { MongoClient, ObjectId } = require("mongodb");

// Overview -> Connect -> MongoDB for VS Code, pra pegar a url
const url = "mongodb+srv://admin:admin@cluster0.qndbayf.mongodb.net/";

async function conectar() {
    // Se der erro, manda no console
    try {
        const mongoClient = await MongoClient.connect(url);

        // db = schema do sql
        // Cria banco de dados se não existe
        return mongoClient.db("loja");
    } catch (erro) {
        console.log("Deu ruim!", erro);
    }
}

async function inserir(produto) {
    const db = await conectar();

    // Collection = tabela do sql
    return db.collection("produtos").insertOne(produto);
}

async function listar() {
    const db = await conectar();

    // dento do find() passa um filtro, {} é filtro vazio então lista tudo
    return db.collection("produtos").find({}).toArray();
}

async function atualizar(id, produtoAtualizado) {
    const db = await conectar();

    // updateOne passa 2 parametros, id e o objeto atualizado
    // o Id tem que ser objeto do tipo ObjectId que é uma classe do mongoDB
    return db.collection('produtos').updateOne({_id: new ObjectId(id)}, {$set: produtoAtualizado})
}

async function remover(id){
    const db = await conectar();

    return db.collection('produtos').deleteOne({_id: new ObjectId(id)});
}

async function testar() {
    // testar inserir
    const resultado = await inserir({ nome: "banana", preco: 20.0 });
    console.log("Produto inserido! ", resultado);

    // testar listar
    const produtos = await listar();
    console.log("Listagem de produtos:", produtos);

    // testar atualizar
    // pegou o ID de algum da base
    const produtoAtualizado = await atualizar("662851725c757b297d47b604", {nome: "uva", preco: 25.0});
    console.log("Produto atualizado: ", produtoAtualizado);

    // testar remover
    // pegou um ID da base
    const produtoApagado = await remover("662856cbb226f846475183f7");
    console.log("Produto removido? Olha o deletedCount", produtoApagado);
}

// No mongodb.com -> Database -> Browse Collections pra ver inserido
testar();
