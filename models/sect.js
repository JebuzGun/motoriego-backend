'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SectorSchema = Schema({
    location: { type: [Number], required: [true, 'Ingrese sector'] },
    completed: { type: Boolean },
    finalPosition: { type: [Number] },
    success: { type: Boolean },
    day: { type: String },
    hour: { type: String },
    camp: { type: Schema.ObjectId, ref: 'Camp' },
});
SectorSchema.plugin(uniqueValidator, { message: 'Cada sector debe tener un punto único' });
module.exports = mongoose.model('Sector', SectorSchema);