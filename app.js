'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//cargar rutas
const user_routes = require('./routes/user');
const sect_routes = require('./routes/sect');
const camp_routes = require('./routes/camp');
const read_routes = require('./routes/reads');
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});
//rutas
app.use('/api/user', user_routes);
app.use('/api/sect', sect_routes);
app.use('/api/camp', camp_routes);
app.use('/api/read', read_routes);
module.exports = app;