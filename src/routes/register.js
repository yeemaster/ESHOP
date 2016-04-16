var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var userModel = require('../models/accounts');
var userEntity = null;


router.get('/',function(req,res,next){
   res.render('register');
});


function hashOperate(obj1,obj2){
  var hash =crypto.createHash('md5');
  hash.update(obj1+obj2);
  return hash.digest('hex');
}

function isExists(userName,userTel,callback){
   
  userModel.findOne({usertel:userTel},function(err,doc){
        if(err){
             res.json({isok:false,errmsg:'连接中断'});
             return;
        }
        else{
           if(!doc){
                        userModel.findOne({username:userName},function(err,doc){
                              if(!doc){
                                    callback(0);  //用户名和手机号都不存在
                              }else{
                                    callback(2);  //用户名已经存在，手机号不存在
                              }
                        });      
            }else{
                callback(1);  //手机号已经存在
            }
        };
    });
}


router.post('/',function(req,res,next){
    var userTel = req.body.inputtel;
    var userName = req.body.inputusername;
    var userpwd = req.body.inputpwd;

    if(userTel === '' || userName === '' || userpwd ===''){
        res.json({isok:false,errmsg:'格式错误'});
        return;
    }

    isExists(userName,userTel,function(tag){
       switch(tag){
       	 case 0:
       	     	 userEntity = new userModel({'username':userName,'usertel':userTel,'hashpwd':hashOperate(userName,userpwd),'hashyzm':hashOperate(userTel,'8888'),'lastlogintime':''});
		           userEntity.save(function(err,doc){
  			  	     if(err){
                     res.json({isok:false,errmsg:'连接中断'});
                     return;
                 }
    			  	   else{
    			  	     	  console.log(userEntity.username + ' saved');
                      res.json({isok:true,errmsg:'注册成功'});
                      // res.redirect('/login');  ajax不能跳转，form的submit可以用这个
    			  	   };
			         });
			  	     break;
		     case 1:
               res.json({isok:false,errmsg:'手机号已经存在'});
		           break;
		     case 2:
               res.json({isok:false,errmsg:'用户名已经存在'});
		           break;
		     default:     
               res.json({isok:false,errmsg:'格式错误'});
		           break;
      };
    });
});

function loginVerifyteTel(userTel,callback){
  if(!userModel){
      callback(2);  //连接中断
      return;
  }
  var query = userModel.findOne().where('usertel',userTel);
  query.exec(function(err,doc){
       if(err){
             callback(2); //连接中断
             return;
       }else{
          if(doc) callback(0); //手机号已经存在
          else callback(1);     //手机号不存在
       }
  });
}

router.post('/verifytel',function(req,res,next){

   loginVerifyteTel(req.body['telNo'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:false,errmsg:' ! 手机号已注册'});
                break;
          case 1:
                res.json({isok:true,errmsg:'手机号OK'});
                break;          
          default:
                res.json({isok:false,errmsg:'连接中断'});
                break;
        }
   });
});


function loginVerifyuser(username,callback){
  if(!userModel){
      callback(2);  //连接中断
      return;
  }
  var query = userModel.findOne().where('username',username);
  query.exec(function(err,doc){
       if(err){
             callback(2); //连接中断
             return;
       }else{
          if(doc) callback(0); //手机号已经存在
          else callback(1);     //手机号不存在
       }
  });
}

router.post('/verifyuser',function(req,res,next){
   loginVerifyuser(req.body['username'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:false,errmsg:' ! 用户名已经注册'});
                break;
          case 1:
                res.json({isok:true,errmsg:'手机号OK'});
                break;  
          default:
                res.json({isok:false,errmsg:'连接中断'});
                break;
        }
   });
});



module.exports = router;