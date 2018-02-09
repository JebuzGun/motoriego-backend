'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SectorSchema = Schema({
    name: { type: String, required: [true, 'Ingrese nombre de sector'] },
    size: { type: Number, required: false },
    point: { type: String, unique: true, required: [true, 'Ingrese un punto de interes'] },
    camp: { type: Schema.ObjectId, ref: 'Camp' },
});
SectorSchema.plugin(uniqueValidator, { message: 'Cada sector debe tener un punto único' });
module.exports = mongoose.model('Sector', SectorSchema);