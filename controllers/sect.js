const Sect = require('../models/sect');
//Obtener sectores
function getSectors(req, res) {
    Sect.find({}, (err, sectors) => {
        if (err) {
            res.status(500).json({
                mensaje: 'Error cargando usuarios',
                ok: false,
                errors: err
            });
        }
        res.status(200).json({
            sectores: sectors,
            ok: true
        });
    });
}
//Almacenar sectores
function saveSect(req, res) {
    let sect;
    let body = req.body;
    if (body.name && body.point && body.camp) {
        sect = new Sect({
            name: body.name,
            size: body.size,
            limits: body.limits,
            point: body.point,
            camp: body.camp
        });
        sect.save((err, sectSaved) => {
            if (err) {
                return res.status(400).json({
                    mensaje: 'Error creando usuario',
                    ok: false,
                    error: err
                });
            } else {
                res.status(201).json({
                    usuario: sectSaved,
                    ok: true,
                    usuarioToken: req.usuario
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
    res.status(200).send({ message: 'Ingrese los datos necesarios' });
}
module.exports = {
    getSectors,
    saveSect,
    updateSect,
    deleteSect
};