'use strict';
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
var usuarioSchema = new Schema({
    name: { type: String, required: [true, 'Nombre necesario'] },
    email: { type: String, unique: true, required: [true, 'Correo necesario'] },
    password: { type: String, required: [true, 'Pass necesario'] },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});
usuarioSchema.plugin(uniqueValidator, { message: 'usuario debe ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);