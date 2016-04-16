var mongoose = require('mongoose');
var accountSchema = require('../schemas/accounts');
var accountModel = mongoose.model('col_accounts',accountSchema);

module.exports = accountModel;