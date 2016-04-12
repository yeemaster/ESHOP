var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userLikeModel;

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){

 var userLikeSchema = new mongoose.Schema(
   {
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

  //实体
  userLikeModel = db.model('col_userlikes',userLikeSchema);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	  getItems(res,function(docs){
	     res.render('index',{"goods":docs});
	  });
});

function getItems(res,callback){
   var query = userLikeModel.find({});
   query.limit(10);
   query.exec(function(err,docs){
       if(err) console.log('query userLikeModel err');
       else{
       	  console.log('co' + docs[0].name);
       	  // mongoose.disconnect(); 这里关掉刷新就不会再打开
       	  callback(docs);
       }
   });
}

module.exports = router;
