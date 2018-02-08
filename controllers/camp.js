'use strict';
const Camp = require('../models/camp');
//Obtener predios
function getCamps(req, res) {
    Camp.find({}, 'name ubication').exec((err, camps) => {
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

}
//Almacenar campo
function saveCamp(req, res) {

}
//Actualizar campo
function updateCamp(req, res) {

}
//Eliminar campo
function deleteCamp(req, res) {

}
module.exports = {
    getCamps,
    getCamp,
    saveCamp,
    updateCamp,
    deleteCamp
};