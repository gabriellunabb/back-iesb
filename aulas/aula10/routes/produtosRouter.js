const express = require("express");
const controller = require("../controllers/produtosController");

const router = express.Router();

router.post("/", controller.validarDados, controller.criar);

module.exports = router;
