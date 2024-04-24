const readline = require("readline-sync");
const Produto = require("./modelo");

const produtos = [];

function listar() {
  produtos.forEach((p) => console.log(p.toString()));
}

function criar() {
  let nome = readline.question("Insira o nome: ");
  let preco = readline.question("Insira o preco: ");

  produtos.push(new Produto(nome, preco));
}

function buscar() {
  let nome = readline.question("Insira o nome: ");

  let resultado = produtos.find((p) => p.nome === nome);
  if (resultado) console.log(resultado.toString());
  else console.log("Não encontrado!");
}

function atualizar() {
  let nome = readline.question("Insira o nome: ");

  let resultado = produtos.find((p) => p.nome === nome);
  if (resultado) {
    if (resultado) console.log(resultado.toString());

    let novoPreco = readline.question("Insira o novo preco: ");
    produtos[produtos.indexOf(resultado)].preco = novoPreco;

    console.log("Atualizado: ", nome, "- Preco:", novoPreco);
  } else console.log("Não encontrado!");
}

function remover() {
  let nome = readline.question("Insira o nome: ");

  let resultado = produtos.findIndex((p) => p.nome === nome);
  if (resultado >= 0) {
    produtos.splice(resultado, 1);
    console.log("Removido: ", nome);
  } else console.log("Não encontrado!");
}

module.exports = { criar, listar, buscar, atualizar, remover };
