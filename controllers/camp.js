'use strict';
const Camp = require('../models/camp');
const User = require('../models/user');
const Sect = require('../models/sect');
//Obtener predios
function getCamps(req, res) {
    Camp.find({}, {'id':0}).exec((err, camps) => {
        if (err) {
            res.status(500).json({
                mensaje: 'Error cargando predios',
                ok: false,
                errors: err
            });
        }
        res.status(200).json({
            predios: camps,
            ok: true,
            user: req.usuario
        });
    });
}
//Obtener campos de un cliente
function getCamp(req, res) {
    //let email = req.usuario.email;
    let body = req.body;
    if (body.rut && body.ubication && body.user) {
        User.findOne({ rut: body.rut }, (err, user) => {
            if (err) {
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            if(!user){
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            Camp.find({ usuario: user._id }, (err, camps) => {
                if (err) {
                    res.status(500).json({
                        mensaje: 'Error cargando predios',
                        ok: false,
                        errors: err
                    });
                }
                if(!camps){
                    res.status(500).json({
                        mensaje: 'Error cargando predios',
                        ok: false,
                        errors: err
                    });
                }
                res.status(200).send({
                    message: 'Ingrese los datos necesarios',
                    campos: camps
                });
            });
        });
    } else {
        res.status(400).send({
            message: 'Ingrese los datos necesarios'
        });
    }
}
//Almacenar campo
function saveCamp(req, res) {
    let email = req.usuario.email;
    let body = req.body;
    if (body.name && body.ubication) {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error almacenando el predio',
                    ok: false,
                    errors: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    mensaje: 'Error al guardar',
                    ok: false,
                    errors: err
                });
            }
            let camp = new Camp({
                name: body.name,
                ubication: body.ubication,
                usuario: user._id
            });
            camp.save((err, campSaved) => {
                if (err) {
                    return res.status(400).json({
                        mensaje: 'Predio no se pudo almacenar',
                        ok: false,
                        errors: err
                    });
                }
                res.status(200).json({
                    usuario: campSaved,
                    ok: true
                });
            });
        });

    } else {
        res.status(200).send({
            message: 'Ingrese los datos necesarios',
            usuario: email
        });
    }
}
//Actualizar campo
function updateCamp(req, res) {
    res.status(200).send({ message: 'Ingrese los datos necesarios' });
}
//Eliminar campo
function deleteCamp(req, res) {
    let campUb = req.params.location;
    if (campUb) {
        Camp.findOne({ ubication: campUb }, (err, camp) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al encontrar predio a eliminar',
                    ok: false,
                });
            }
            if (!camp) {
                return res.status(500).json({
                    mensaje: 'Predio no registrado',
                    ok: false
                });
            } else {
                Camp.findOneAndRemove(camp._id, (err, campDeleted) => {
                    if (err) {
                        return res.status(500).json({
                            mensaje: 'Usuario no se pudo eliminar',
                            ok: false
                        });
                    }
                    res.status(200).json({
                        predio: campDeleted,
                        ok: true
                    });
                });
            }
        });
    } else {
        res.status(200).send({ message: 'Ingrese los datos necesarios' });
    }
}
module.exports = {
    getCamps,
    getCamp,
    saveCamp,
    updateCamp,
    deleteCamp
};