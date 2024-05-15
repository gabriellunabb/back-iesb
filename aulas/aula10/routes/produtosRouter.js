const express = require("express");
const controller = require("../controllers/produtosController");

const router = express.Router();

router.post("/", controller.validarDados, controller.criar);

router.get("/", controller.buscarTodos);
router.get("/:id", controller.buscarPorId, controller.buscar);
router.put("/:id", controller.validarDados, controller.buscarPorId, controller.atualizar);
router.delete("/:id", controller.buscarPorId, controller.deletar);

module.exports = router;
