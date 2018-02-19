'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReadSchema = Schema({
    client: { type: Schema.ObjectId, ref: 'User'},
    reads: { type: String },
    upload_at: { type: String }
});
module.exports = mongoose.model('Read',ReadSchema);