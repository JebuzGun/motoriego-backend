'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CampSchema = Schema({
    name: { type: String, required: false },
    ubication: { type: String, unique: true, required: false },
    usuario: { type: Schema.ObjectId, ref: 'User' }
});
CampSchema.plugin(uniqueValidator, { message: 'La ubicación debe ser unica' });
module.exports = mongoose.model('Camp', CampSchema);