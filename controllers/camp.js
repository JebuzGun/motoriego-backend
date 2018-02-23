'use strict';
const Camp = require('../models/camp');
const User = require('../models/user');
const Sect = require('../models/sect');

//Obtener predios
function getCamps(req, res) {
    let camp = Camp.find({}, {'_id': 0, 'client': 0});
    camp.populate({path: 'camps'}).exec((err, camps) => {
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
function getUserCamp(req, res) {
    let rut = req.params.rut;
    if (rut) {
        User.findOne({rut: rut}, (err, userFind) => {
            if (err) {
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            if (!userFind) {
                res.status(500).json({
                    mensaje: 'Error cargando predios',
                    ok: false,
                    errors: err
                });
            }
            let camps = Camp.find({client: userFind._id}, {'_id': 0, 'client': 0});
            camps.populate({path: 'Sect'}).exec((err, userCamps) => {
                if (err) {
                    res.status(500).json({
                        mensaje: 'Error cargando predios',
                        ok: false,
                        errors: err
                    });
                }
                if (!userCamps) {
                    res.status(500).json({
                        mensaje: 'Error cargando predios',
                        ok: false,
                        errors: err
                    });
                }
                res.status(200).send({
                    ok: true,
                    campos: userCamps
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
        User.findOne({rut: body.rut}, (err, userFind) => {
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
                } else {
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
    if (req.params.rut && req.body.camps && req.body.name) {
        let rut = req.params.rut;
        let body = req.body;
        User.findOne({rut: rut}, (err, userFinded) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al actualizar datos',
                    ok: false,
                });
            }
            if (!userFinded) {
                return res.status(404).json({
                    mensaje: 'Usuario no registrado',
                    ok: false
                });
            } else {
                Camp.findOne({name: body.name, client: userFinded._id},{'_id':0}, (err, campFinded)=>{
                    if (err) {
                        return res.status(500).json({
                            mensaje: 'Error al actualizar datos',
                            ok: false,
                        });
                    }
                    if (!campFinded) {
                        return res.status(404).json({
                            mensaje: 'Campo no encontrado',
                            ok: false,
                            nombre: body.name,
                            user: userFinded,
                            camp: campFinded
                        });
                    }else{
                        campFinded.client = userFinded._id;
                        campFinded.camps = body.camps;
                        campFinded.save((err, updCamp)=>{
                            if (err) {
                                return res.status(400).json({
                                    mensaje: 'Campo no actualizado',
                                    ok: false,
                                    errors: err
                                });
                            }
                            if (!updCamp) {
                                return res.status(400).json({
                                    mensaje: 'Campo no actualizado',
                                    ok: false,
                                    errors: err
                                });
                            }else{
                                return res.status(200).json({
                                    predio: updCamp,
                                    ok: true
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(400).send({message: 'Error en la solicitud'});
    }
}

//Eliminar campo
function deleteCamp(req, res) {
    let campUb = req.params.location;
    if (campUb) {
        Camp.findOne({ubication: campUb}, (err, camp) => {
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
        res.status(200).send({message: 'Ingrese los datos necesarios'});
    }
}

module.exports = {
    getCamps,
    getUserCamp,
    saveCamp,
    updateCamp,
    deleteCamp
};