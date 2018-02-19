'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/motoriego')
    .then(() => {
        app.listen(port, () => {
            console.log('servidor corriendo');
        });
    }).catch((err) => {
        console.log(err);
    });