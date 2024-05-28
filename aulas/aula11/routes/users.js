var express = require("express");
var router = express.Router();

const controller = require("../controllers/users");

router.post("/", controller.criar);

router.post("/login", controller.entrar);

router.post("/renovar", controller.renovar);

module.exports = router;
