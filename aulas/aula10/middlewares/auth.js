const jwt = require("jsonwebtoken");

function validarToken(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        try {
            const payload = jwt.verify(token, "123");
            console.log(payload);
            next();
        } catch (e) {
            res.status(400).json({ msg: "token negado" });
        }
    } else {
        res.status(400).json({ msg: "token invalido" });
    }
}

module.exports = validarToken;
