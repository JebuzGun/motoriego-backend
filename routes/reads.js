'use strict';
const express = require('express');
const ReadController = require('../controllers/reads');
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get('/',ReadController.getReads);
api.post('/',ReadController.saveRead);
module.exports = api;