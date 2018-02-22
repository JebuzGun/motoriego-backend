"use strict";
const express = require("express");
const SectController = require("../controllers/sect");
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get('/', mdAutenticacion.verificaToken, SectController.getSectors);
api.get('/:rut', mdAutenticacion.verificaToken, SectController.getCampSectors);
api.post('/user/:rut', mdAutenticacion.verificaToken, SectController.saveSect);
api.put('/', mdAutenticacion.verificaToken, SectController.updateSect);
api.delete('/:point', mdAutenticacion.verificaToken, SectController.deleteSect);
module.exports = api;