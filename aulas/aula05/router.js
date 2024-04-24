const express = require("express");

const router = express.Router();

router.get("/produtos", (req, res) => {
    res.send({});
});

router.get("/produtos/:id", (req, res) => {
    if (req.params.id == 999) res.status(404).send({});
    res.send({});
});

router.post("/produtos", (req, res) => {
    res.status(201).send({});
});

router.put("/produtos/:id", (req, res) => {
    res.send({});
});

router.delete("/produtos/:id", (req, res) => {
    res.status(204).send();
});

module.exports = router;
