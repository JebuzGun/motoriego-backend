'use strict';
const Camp = require('../models/camp');
const User = require('../models/user');
const Sect = require('../models/sect');
//Obtener predios
function getCamps(req, res) {
    Camp.find({}, {'_id':0,'client':0}).exec((err, camps) => {
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
function save
//Obtener campos de un cliente
function getUserCamp(req, res) {
    let rut = req.params.rut;
    if (rut) {
        User.findOne({ rut: rut }, (err, userFind) => {
            if (err) {
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            if(!userFind){
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            let camps = Camp.find({ client: userFind._id }, {'_id':0,'client':0});
                camps.populate({path: 'Sect'}).exec((err, camps) => {
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
                        ok: true,
                        campos: camps
                });
            });
        });
    } else {
        res.status(400).send({
            message: 'Ingrese los datos necesarios',
            ok: false
        });
    }
}
//Almacenar campo
function saveCamp(req, res) {
    let body = req.body;
    if (body.name && body.location) {
        User.findOne({ rut: body.rut }, (err, userFind) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error almacenando el predio',
                    ok: false,
                    errors: err
                });
            }
            if (!userFind) {
                return res.status(404).json({
                    mensaje: 'Error al guardar',
                    ok: false,
                    errors: err
                });
            }
            let camp = new Camp({
                name: body.name,
                location: body.location,
                client: userFind._id
            });
            console.log(userFind);
            camp.save((err, campSaved) => {
                if (err) {
                    return res.status(400).json({
                        mensaje: 'Predio no se pudo almacenar',
                        ok: false,
                        errors: err
                    });
                }else{
                    return res.status(200).json({
                        predio: campSaved,
                        ok: true
                    });
                }
            });
        });
    } else {
        res.status(200).send({
            message: 'Ingrese los datos necesarios',
            ok: false
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
    getUserCamp,
    saveCamp,
    updateCamp,
    deleteCamp
};