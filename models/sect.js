'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SectorSchema = Schema({
    position: { type: [Number], required: [true, 'Ingrese sector'] },
    completed: { type: Boolean ,default: false },
    finalPosition: { type: [Number] ,default: [0,0] },
    success: { type: Boolean ,default: false },
    day: { type: String, default: "" },
    hour: { type: String, default: "" },
    camp: { type: Schema.ObjectId, ref: 'Camp' },
});
SectorSchema.plugin(uniqueValidator, { message: 'Cada sector debe tener un punto único' });
module.exports = mongoose.model('Sector', SectorSchema);