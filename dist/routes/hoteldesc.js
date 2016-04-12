var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');
var proModel;
var remaiModel;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    var proSchema = new mongoose.Schema(
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
		    "city":   {type:String},
            "point-x":  {type:Number},
            "point-y":  {type:Number},
		    "items": 
		    [
		        {
		            "item-id": {type:String},
		            "item-desc" : {type:String},
		            "item-price-line": {type:Number},
		            "item-old-price": {type:Number},
		            "item-bought": {type:Number},
		            "item-img": {type:String}
		        }
		    ]
		}
    );


    proModel = db.model('col_proitems',proSchema);
    var remaiSchema = new mongoose.Schema(
		  {
		  	"_id": {type: mongoose.Schema.Types.ObjectId},  //主键
		    "name":{type:String},
		    "objid":{type:String,unique:true},
		    "img":{type:String},
		    "desc":{type:String},
		    "price":{type:Number},
		    "old-price":{type:Number},
		    "privilege":{type:String},
		    "bought":{type:String},
		    "store":{type:String},
            "img": {type:String}
		  }
    );

    
    remaiModel = db.model('col_userlikes',remaiSchema);
});




router.get('/',function(req,res,next){
   getItems(req,res,function(docsPro,docsRemai){
      res.render('hoteldesc',{"pro":docsPro,"remai":docsRemai});
   });
});


function getItems(req,res,callback){
    if(req.query.id){
		var query = proModel.findOne({"_id":req.query.id});
		query.exec(function(err,docsPro){
			if(err) console.log('query proModel err');
			else{
	            var queryremai = remaiModel.find({})
	            queryremai.limit(8);
	            queryremai.exec(function(err,docsRemai){
	            	if(err) console.log('query remai err');
	            	else{
	                    console.log('suc :' + docsPro["_id"] +  ' / ' +  docsRemai.length);
				        callback(docsPro,docsRemai);
	            	}
	            });	
			}
		});
    }
}



module.exports = router;