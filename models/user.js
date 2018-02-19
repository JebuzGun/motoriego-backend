'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
const usuarioSchema = new Schema({
    name: { type: String, required: [true, 'Nombre necesario'] },
    email: { type: String, unique: true, required: [true, 'Correo necesario'] },
    password: { type: String, required: [true, 'Pass necesario'] },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});
usuarioSchema.plugin(uniqueValidator, { message: 'usuario debe ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);