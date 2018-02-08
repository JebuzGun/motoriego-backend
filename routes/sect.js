"use strict";
const express = require("express");
const SectController = require("../controllers/sect");
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get('/', mdAutenticacion.verificaToken, SectController.getSectors);
api.post('/', mdAutenticacion.verificaToken, SectController.saveSect);
api.put('/', mdAutenticacion.verificaToken, SectController.updateSect);
api.delete('/', mdAutenticacion.verificaToken, SectController.deleteSect);
module.exports = api;