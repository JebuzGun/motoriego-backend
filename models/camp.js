'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CampSchema = Schema({
    name: {type: String, required: false},
    ubication: {type: String, required: [true,'Ubicación necesaria']},
    usuario: {type: Schema.ObjectId, ref: 'User'}
});
module.exports = mongoose.model('Camp',CampSchema);