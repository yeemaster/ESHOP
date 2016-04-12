var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');
var preid;
var nowid;
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
		    "items": 
		    [
		        {
		        	"_id": {type: mongoose.Schema.Types.ObjectId},
		            "item-id": {type:String},
		            "item-desc" : {type:String},
		            "item-price-line": {type:Number},
		            "item-old-price": {type:Number},
		            "item-bought": {type:Number},
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
		    "store":{type:String}
		  }
    );

    
    remaiModel = db.model('col_userlikes',remaiSchema);
});




router.get('/',function(req,res,next){
   getItems(req,res,function(docsPro,docsRemai){
   	  var nowItem;
   	  var OtherItem = [];
   	  console.log('nowid= ' + nowid);
      for(var i=0;i<docsPro.items.length;i++){
      	 console.log(i + ":" + docsPro.items[i]["_id"] );
      	 // 这里需要自动转类型 因此没用===
      	 if(docsPro.items[i]["_id"] == nowid) nowItem = docsPro.items[i];
      	 else OtherItem.push(docsPro.items[i]);
      }
      console.log(" otheritem= " + OtherItem.length);

      console.log('nowItem = ' + nowItem["item-detail"]["item-detail-name"] + " otheritem= " + OtherItem.length);
      res.render('hoteldetail',{"remai":docsRemai,"otheritem":OtherItem,"nowitem":nowItem});
   });
});


function getItems(req,res,callback){
    if(req.query.id){
    	preid = req.query.preid;
    	nowid = req.query.id;
    	console.log(preid);
		var query = proModel.findOne({"_id":preid});
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