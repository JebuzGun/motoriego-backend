"use strict";
const express = require("express");
const UserController = require("../controllers/user");
const AuthController = require('../controllers/auth');
const api = express.Router();
//middlewares
const mdAutenticacion = require('../middlewares/auth');
//rutas
api.get("/", mdAutenticacion.verificaToken, UserController.getUsers);
api.post('/', mdAutenticacion.verificaToken, UserController.saveUser);
api.put('/', mdAutenticacion.verificaToken, UserController.updateUser);
api.delete('/:mail', mdAutenticacion.verificaToken, UserController.deleteUser);
api.post('/login', AuthController.login);
//api.post("/login", UserController.loginUser);
module.exports = api;