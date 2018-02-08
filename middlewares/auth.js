var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
//Verificar Token
exports.verificaToken = function(req, res, next) {
    let token = req.headers.authorization.replace(/['"]+/g, '');
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                mensaje: 'Sin permisos para realizar la acción',
                ok: false,
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};