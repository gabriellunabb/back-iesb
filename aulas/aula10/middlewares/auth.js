function validarToken(req, res, next) {
    if (req.headers.token === "123") {
        next();
    } else {
        res.status(401).json({msg: "n autorizado"})
    }
}

module.exports = validarToken;
