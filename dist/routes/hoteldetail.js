var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var proModel = require('../models/pro');
var remaiModel = require('../models/userlikes');

var preid;
var nowid;

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
      console.log("preid" + preid);
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