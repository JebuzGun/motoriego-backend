'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CampSchema = Schema({
    name: { type: String, required: false },
    location: { type: [Number], unique: true, required: false },
    client: { type: Schema.ObjectId, ref: 'User',required: true }
});
CampSchema.plugin(uniqueValidator, { message: 'La ubicación debe ser unica' });
module.exports = mongoose.model('Camp', CampSchema);