'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SectorSchema = Schema({
    name: { type: String, required: [true, 'Ingrese un nombre de sector'] },
    size: { type: String, required: false },
    limits: { type: String, required: false },
    point: { type: [Number], required: [true, 'Ingrese un punto de interes'] },
    camp: { type: Schema.ObjectId, ref: 'Camp' },
});
module.exports = mongoose.model('Sector', SectorSchema);