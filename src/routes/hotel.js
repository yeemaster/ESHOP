var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var proModel;

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');
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
            "item-img": {type:String}
        }
    ]
}
);

  //实体
  proModel = db.model('col_proitems',proSchema);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	  getItems(res,function(docs){
	     res.render('hotel',{"proitems":docs});
	  });
});

function getItems(res,callback){
   var query = proModel.find({});
   query.limit(3);
   query.exec(function(err,docs){
       if(err) console.log('query proModel err');
       else{
       	  console.log('co' + docs[0]["_id"] + 'kco' + docs[0]["items"][0]["_id"]);
       	  // mongoose.disconnect(); 这里关掉刷新就不会再打开
       	  callback(docs);
       }
   });
}

module.exports = router;
