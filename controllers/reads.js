'use strict';
const Read = require('../models/reads');
const User = require('../models/user');
//obtener lecturas
function getReads(req,res){
    Read.find({},{'_id':0,}, (err,reads)=>{
       if(err){
           return res.status(500).json({
               mensaje: 'Error cargando lecturas',
               ok: false,
               errors: err
           });
       }
        res.status(200).json({
            lecturas: reads,
            ok: true
        });
    });
}
function saveRead(req,res){
    let body = req.body;
    let user = body.email;
    if(user && body.reads){
        User.findOne({ email: user }, (err, user)=>{
            if (err) {
                return res.status(400).json({
                    mensaje: 'Error almacenando lecturas',
                    ok: false,
                    error: err
                });
            }
            if(!user){
                return res.status(404).json({
                    mensaje: 'Usuario no encontrado',
                    ok: false,
                    error: err
                });
            }
            let read = new Read({
                client: user._id,
                reads: body.reads
            });
            read.save((err,readsSaved)=>{
                if (err) {
                    return res.status(400).json({
                        mensaje: 'Error almacenando lecturas',
                        ok: false,
                        error: err
                    });
                } else {
                    res.status(201).json({
                        sect: readsSaved,
                        ok: true
                    });
                }
            });
        });
    }else{
        res.status(200).send({ message: 'Ingrese los datos necesarios' });
    }
}
module.exports = {
  getReads,
  saveRead
};