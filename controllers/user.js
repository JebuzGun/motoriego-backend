'use strict';
const bcrypt = require('bcryptjs');
const User = require('../models/user');
//Obtener usuarios
function getUsers(req, res) {
    User.find({}, {'_id':0,name:'1',email:'1'}).exec((err, users) => {
        if (err) {
            res.status(500).json({
                mensaje: 'Error cargando usuarios',
                ok: false,
                errors: err
            });
        }
        res.status(200).json({
            usuarios: users,
            ok: true
        });
    });
}
//Crear usuario
function saveUser(req, res) {
    let user;
    let body = req.body;
    if (body.password && body.rut) {
        user = new User({
            client: body.client,
            rut: body.rut,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            role: body.role
        });
        user.save((err, userSaved) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error creando usuario',
                    ok: false,
                    error: err
                });
            } else {
                res.status(201).json({
                    usuario: userSaved,
                    ok: true,
                    usuarioToken: req.usuario
                });
            }
        });
    } else {
        res.status(400).send({ message: 'Ingrese los datos necesarios' });
    }
}
//Actualizar usuario
function updateUser(req, res) {
    var body = req.body;
    User.findOne({ rut: body.rut },(err, userDB) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error buscando usuario',
                ok: false,
                errors: err
            });
        }
        if (!userDB) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado',
                ok: false,
                errors: err
            });
        }
        userDB.nombre = body.nombre;
        userDB.rut = body.rut;
        userDB.email = body.email;
        userDB.role = body.role;
        userDB.save((err, userSaved) => {
            if (err) {
                return res.status(400).json({
                    mensaje: 'Usuario no actualizado',
                    ok: false,
                    errors: err
                });
            }
            userSaved.password = ":)";
            res.status(200).json({
                usuario: userSaved,
                ok: true
            });
        });
    });
}
//Eliminar usuario
function deleteUser(req, res) {
    let id = req.params.rut;
    User.findOne({ rut: id }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error al eliminar el usuario',
                ok: false,
            });
        }
        if (!userDB) {
            return res.status(404).json({
                mensaje: 'Usuario no registrado',
                ok: false
            });
        } else {
            User.findByIdAndRemove(userDB._id, (err, userDeleted) => {
                if (err) {
                    return res.status(404).json({
                        mensaje: 'Usuario no se pudo eliminar',
                        ok: false
                    });
                }
                if (!userDeleted) {
                    return res.status(400).json({
                        mensaje: 'Usuario no encontrado',
                        ok: false,
                    });
                }
                res.status(200).json({
                    usuario: userDeleted,
                    ok: true
                });
            });
        }
    });
}
module.exports = {
    saveUser,
    getUsers,
    updateUser,
    deleteUser
};