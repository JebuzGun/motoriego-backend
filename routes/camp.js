'use strict';
const express = require('express');
const CampController = require('../controllers/camp');
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get('/', mdAutenticacion.verificaToken, CampController.getCamps);
module.exports = api;