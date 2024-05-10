const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        uppercase: true,
        required: [true, "Nome eh obrigatorio"],
        minLength: [3, "Nome deve ter pelo menos 3 caracteres"],
    },
    preco: { type: Number, min: [0, "Preco deve ser >= 0"] },
    quantidade: { type: Number, default: 0 },
});

module.exports = mongoose.model("Produto", produtoSchema);
