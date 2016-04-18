var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userLikeModel = require('../models/userlikes');

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
