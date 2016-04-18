var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var remaiSchema = new Schema(
		  {
		  	"_id": {type: mongoose.Schema.Types.ObjectId},  //主键
		    "name":{type:String},
		    "objid":{type:String},
		    "preobjid":{type:String},
		    "desc":{type:String},
		    "price":{type:Number},
		    "old-price":{type:Number},
		    "privilege":{type:String},
		    "bought":{type:String},
		    "store":{type:String},
		    "img": {type:String}
		  }
);

module.exports = remaiSchema;