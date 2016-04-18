var mongoose = require('mongoose');
var proShcema = require('../schemas/pro');
var proModel = mongoose.model('col_proitems',proShcema);

module.exports = proModel;