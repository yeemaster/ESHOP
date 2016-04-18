var mongoose = require('mongoose');
var remaiSchema = require('../schemas/remai');
var remaiModel =  mongoose.model('col_userlikes_remai',remaiSchema);

module.exports = remaiModel;