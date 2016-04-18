var mongoose = require('mongoose');
var userlikeSchema = require('../schemas/userlikes');
var userlikemodel = mongoose.model('col_userlikes',userlikeSchema);

module.exports = userlikemodel;