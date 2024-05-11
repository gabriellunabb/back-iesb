const express = require("express");
const controller = require("../controllers/produtosController");

const router = express.Router();

router.post("/", controller.validarDados, controller.criar);

router.get("/", controller.buscarTodos);
router.get("/:id", controller.buscarPorId);

module.exports = router;
