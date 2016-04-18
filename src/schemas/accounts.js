var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accountSchema = new Schema({
      username:{type:String,unique:true},
      usertel:{type:String,unique:true},
      hashpwd:{type:String},
      hashyzm:{type:String},
      lastlogintime:{type:String}
});

module.exports = accountSchema;