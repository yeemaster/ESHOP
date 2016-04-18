var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proSchema = new Schema(
        {
			"_id": {type: mongoose.Schema.Types.ObjectId},
		    "name" :    {type:String},
		    "headimg" : {type:String},
		    "score":  {type:Number},
		    "store":  {type:String},
		    "addr":   {type:String},
		    "desc":   {type:String},
		    "type":   {type:Number},
		    "remai":  {type:Number},
		    "items": 
		    [
		        {
		        	"_id": {type: mongoose.Schema.Types.ObjectId},
		            "item-id": {type:String},
		            "item-desc" : {type:String},
		            "item-price-line": {type:Number},
		            "item-old-price": {type:Number},
		            "item-bought": {type:String},
		            "item-img": {type:String},
		            "item-detail": {
		                 "item-detail-name":{type:String},
		                 "item-detail-img": {type:String},
		                 "item-detail-desc":{type:String},
		                 "item-detail-suibiantui": {type:Boolean},
		                 "item-detail-shengyujitian": {type:Number},
		                 "item-detail-score": {type:Number},
		                 "item-detail-content": {type:String},
		                 "item-detail-commentcount": {type:Number},
		                 "item-detail-comment":[
		                    {
		                       "comment-name":{type:String},
		                       "comment-date":{type:String},
		                       "comment-score": {type:Number},
		                       "comment-conetnt":{type:String}
		                    }
		                 ]
		            }		            
		        }
		    ]
		}
);

module.exports = proSchema;