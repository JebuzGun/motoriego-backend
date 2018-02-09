'use strict';
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
var app = express();
var User = require('../models/user');
//Login
function login(req, res) {
    let body = req.body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error en el ingreso',
                ok: false,
                errors: err
            });
        }
        if (!user) {
            return res.status(400).json({
                mensaje: 'Credenciales incorrectas',
                ok: false
            });
        }
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                mensaje: 'Credenciales incorrectas',
                ok: false,
                errors: err
            });
        } else {
            //crear un token
            var token = jwt.sign({ usuario: user }, SEED, { expiresIn: '10d' });
            user.password = ":)";
            return res.status(200).json({
                ok: true,
                usuario: user,
                token: token,
                id: user._id
            });
        }
    });
}
module.exports = {
    login
};