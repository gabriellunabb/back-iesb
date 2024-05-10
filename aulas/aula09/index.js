require("dotenv").config();
const mongoose = require("mongoose");

const Produto = require("./modelo");

const url = process.env.MONGODB_URL;

async function main() {
    try {
        await mongoose.connect(url);
        console.log("OK!");
    } catch (e) {
        console.log("Erro!", e);
    }

    try {
        const produto = new Produto({
            nome: "         ",
            preco: 1,
            quantidade: 2,
        });
        await produto.save();
        console.log(produto);
    } catch (e) {
        for (let k in e.errors) {
            console.log(e.errors[k].message);
        }
    }

    // const produto = await Produto.create({
    //     nome: "nome2",
    //     preco: 1,
    //     quantidade: 'asdasd',
    // });
    // console.log(produto);

    // const produto = await Produto.insertMany([
    //     { nome: "ome", preco: 2, quantidade: 1 },
    //     { nome: "ome2", preco: 2, quantidade: 1 },
    //     { nome: "ome3", preco: 2, quantidade: 1 },
    // ]);
    // console.log(produto);

    // const produto = await Produto.findOne({nome: "nome"})
    // console.log(produto)

    // const produto = await Produto.findOneAndUpdate(
    //     { nome: "nome" },
    //     { nome: "nome editato", preco: 15, quantidade: 2 }
    // );
    // console.log(produto);

    // const produto = await Produto.findOneAndDelete({ nome: "nome editato" });
    // console.log(produto);

    // const produtos = await Produto.find({});
    // console.log(produtos);

    await mongoose.disconnect();
}

main();
