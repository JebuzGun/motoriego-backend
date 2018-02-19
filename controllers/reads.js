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
module.exports = {
  getReads
};