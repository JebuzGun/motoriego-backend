'use strict';
const express = require('express');
const CampController = require('../controllers/camp');
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get('/', mdAutenticacion.verificaToken, CampController.getCamps);
api.get('/:rut', CampController.getUserCamp);
api.post('/', mdAutenticacion.verificaToken, CampController.saveCamp);
api.put('/:rut', mdAutenticacion.verificaToken, CampController.updateCamp);
api.delete('/:location', mdAutenticacion.verificaToken, CampController.deleteCamp);
module.exports = api;