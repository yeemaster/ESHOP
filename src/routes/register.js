var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var userModel;
var userEntity;



var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){

   var userSchema = new mongoose.Schema({
      username:{type:String,unique:true},
      usertel:{type:String,unique:true},
      hashpwd:{type:String},
      hashyzm:{type:String},
      lastlogintime:{type:String}
   });

   userModel = db.model('col_accounts',userSchema);
});



router.get('/',function(req,res,next){
   res.render('register');
});



router.post('/',function(req,res,next){
    var userTel = req.body.inputtel;
    var userName = req.body.inputusername;
    var userpwd = req.body.inputpwd;

    if(userTel === '' || userName === '' || userpwd ===''){
        console.log('u empty');
        res.redirect('/register');
        return;
    }

    isExists(userName,userTel,function(tag){
       switch(tag){
       	 case 0:
       	     	userEntity = new userModel({'username':userName,'usertel':userTel,'hashpwd':hashOperate(userName,userpwd),'hashyzm':hashOperate(userTel,'111111'),'lastlogintime':''});
		        userEntity.save(function(err,doc){
			  	     if(err) console.log(err);
			  	     else {
			  	     	         console.log(userEntity.username + ' saved')
                                 res.redirect('/login');
			  	     	  };
			    });
			  	break;
		 case 1:
		        console.log('tel is exist');
		        res.redirect('/register');
		        break;
		 case 2:
		        console.log('yonghu is exist');
		        res.redirect('/register');
		        break;
		 default:     
		        res.redirect('/register');
		        break;
      };
    });
});


function isExists(userName,userTel,callback){
   
	userModel.findOne({usertel:userTel},function(err,doc){
        if(err) console.log('getusertel err');
        else{
           if(!doc){
                    userModel.findOne({username:userName},function(err,doc){
		                    if(!doc){
		                          callback(0);
		                    }else{
		                          callback(2);
		                    }
                    });      
            }else{
                callback(1);
            }
        };
    });
}


function hashOperate(obj1,obj2){
	var hash =crypto.createHash('md5');
	hash.update(obj1+obj2);
	return hash.digest('hex');
}

router.post('/verifytel',function(req,res,next){
   loginVerifyteTel(req.body['telNo'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:false,errmsg:' ! 手机号已注册'});
                break;
          default:
                res.json({isok:true,errmsg:'手机号OK'});
                break;
        }
   });
});

function loginVerifyteTel(userTel,callback){
  if(!userModel){
    callback(2);
    return;
  }
  var query = userModel.findOne().where('usertel',userTel);
  query.exec(function(err,doc){
       if(err||!doc){
        callback(2);
        return;
       }
       callback(0);
  });
}

router.post('/verifyuser',function(req,res,next){
   loginVerifyuser(req.body['username'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:false,errmsg:' ! 用户名已经注册'});
                break;
          default:
                res.json({isok:true,errmsg:'用户名OK'});
                break;
        }
   });
});

function loginVerifyuser(username,callback){
  if(!userModel){
    callback(2);
    return;
  }
  var query = userModel.findOne().where('username',username);
  query.exec(function(err,doc){
       if(err||!doc){
        callback(2);
        return;
       }
       callback(0);
  });
}

module.exports = router;