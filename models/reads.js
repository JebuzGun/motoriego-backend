'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReadSchema = Schema({
    client: { type: Schema.ObjectId, ref: 'User'},
    reads: { type: Schema.Types.Mixed },
    upload_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Read',ReadSchema);