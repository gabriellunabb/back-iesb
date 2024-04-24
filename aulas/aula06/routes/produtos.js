var express = require("express");

var produtosController = require("../controllers/controller_produtos");

var router = express.Router();

router.get("/", produtosController.listarTodos);

router.get("/:id", produtosController.buscarPeloId, produtosController.exibir);

router.post("/", produtosController.validarDados, produtosController.criar);

router.put(
    "/:id",
    produtosController.validarDados,
    produtosController.buscarPeloId,
    produtosController.editar
);

router.delete(
    "/:id",
    produtosController.buscarPeloId,
    produtosController.apagar
);

module.exports = router;
