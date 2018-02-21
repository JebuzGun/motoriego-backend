'use strict';
const Sect = require('../models/sect');
const Camp = require('../models/camp');
const User = require('../models/user');
//Obtener sectores
function getSectors(req, res) {
    Sect.find({}, {'_id':0},(err, sectors) => {
        if (err) {
            res.status(500).json({
                mensaje: 'Error cargando usuarios',
                ok: false,
                errors: err
            });
        }
        res.status(200).json({
            sectores: sectors,
            ok: true,
            usuarioToken: req.usuario
        });
    });
}
//Obtener sectores de un campo
function getCampSectors(req, res) {
    let campLoc = req.params.location;
    console.log(campLoc);
    if (campLoc) {
        Camp.findOne({ ubication: campLoc }, (err, camp) => {
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error cargando sectores',
                    ok: false,
                    errors: err
                });
            }
            if (!camp) {
                return res.status(404).json({
                    mensaje: 'Error al cargar sectores',
                    ok: false,
                    errors: err
                });
            }
            Sect.find({ camp: camp._id }, (err, sectors) => {
                if (err) {
                    res.status(500).json({
                        mensaje: 'Error cargando sectores',
                        ok: false,
                        errors: err
                    });
                }
                res.status(200).send({
                    ok: true,
                    sectors: sectors
                });
            });
        });
    } else {
        res.status(200).send({ message: 'Ingrese los datos necesarios' });
    }
}
//Almacenar sectores
function saveSect(req, res) {
    let body = req.body;
    let name = body.name;
    let rut = req.params.rut;
    if (body.position && rut) {
        User.findOne({rut:rut},(err,userFind)=>{
            if (err) {
                res.status(500).json({
                    mensaje: 'Error almacenando sector 1',
                    ok: false,
                    errors: err
                });
            }
            if(!userFind){
                res.status(500).json({
                    mensaje: 'Error almacenando sector 1',
                    ok: false,
                    errors: err
                });
            }else{
                Camp.findOne({ name: name, client: userFind._id}, (err, camp) => {
                    if (err) {
                        res.status(500).json({
                            mensaje: 'Error almacenando sector 2',
                            ok: false,
                            errors: err
                        });
                    }
                    if(!camp){
                        res.status(500).json({
                            mensaje: 'Error almacenando sector 2',
                            ok: false,
                            errors: err
                        });
                    }
                    let sect = new Sect({
                        position: body.position,
                        camp: camp._id
                    });
                    sect.save((err, sectSaved) => {
                        if (err) {
                            return res.status(400).json({
                                mensaje: 'Error almacenando sector 3',
                                ok: false,
                                error: err
                            });
                        } else {
                            res.status(201).json({
                                sect: sectSaved,
                                ok: true,
                                usuarioToken: req.usuario
                            });
                        }
                    });
                });
            }
        });
    } else {
        res.status(200).send({ message: 'Ingrese los datos necesarios' });
    }
}
//Actulizar sector
function updateSect(req, res) {
    res.status(200).send({ message: 'Ingrese los datos necesarios' });
}
//Eliminar sector
function deleteSect(req, res) {
    let point = req.params.point;
    if (point) {
        Sect.findOne({ point: point }, (err, sect) => {
            console.log(point);
            if (err) {
                return res.status(500).json({
                    mensaje: 'Error cargando sectores',
                    ok: false,
                    errors: err
                });
            }
            if (!sect) {
                return res.status(404).json({
                    mensaje: 'No se ha encontrado el sector',
                    ok: false
                });
            } else {
                Sect.findByIdAndRemove(sect._id, (err, deletedSect) => {
                    if (err) {
                        return res.status(500).json({
                            mensaje: 'Error elimimando sector',
                            ok: false,
                            error: err
                        });
                    } else {
                        res.status(201).json({
                            sect: deletedSect,
                            ok: true,
                            usuarioToken: req.usuario
                        });
                    }
                });
            }
        });
    } else {
        res.status(200).send({ message: 'Ingrese los datos necesarios' });
    }
}
module.exports = {
    getSectors,
    getCampSectors,
    saveSect,
    updateSect,
    deleteSect
};