var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var userModel;

function hashOperate(obj1,obj2){
  var hash =crypto.createHash('md5');
  hash.update(obj1+obj2);
  return hash.digest('hex');
}

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



function getLastLoginTime(req,res,userTel){
	if(!userModel){
    console.log('getLastLoginTime userModel err');
		return;
	}

	var loginTime = Date().toString();
	userModel.findOne({usertel:userTel},function(err,doc){
        if(err) console.log('getLastLoginTime err');
        else{
        	res.cookie('account',{'username': doc.username,'usertel':doc.usertel,'pwd': doc.hashpwd,last:doc.lastlogintime}, {maxAge : new Date().valueOf() + 60000000});
          res.redirect('userhome'+'?username='+doc.username+'&usertel='+doc.usertel);
          console.log('now is '+ doc.usertel);
        	doc.update({$set:{lastlogintime:loginTime}},function(err,doc){
               if(err) console.log('update login error');
               else console.log('update login time');
        	});
        }
	});
}

function authenticate(userName,hashPwd,callback){
	if(!userModel){
		callback(2);
		return;
	}
	var query = userModel.findOne().where('username',userName);
	query.exec(function(err,doc){
       if(err||!doc){
       	callback(2);
       	return;
       }
       if(doc.hashpwd === hashPwd) callback(0)
       else callback(1);
	});
}

function authenticateTel(userTel,hashYzm,callback){
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
       if(doc.hashyzm === hashYzm) callback(0)
       else callback(1);
  });
}

function isLogined(req,res){
    if(req.cookies['account']!=null){
    	console.log("123");
    	var account = req.cookies['account'];
    	var userName = account.username;
      var userTel = account.usertel;
    	var hashPwd = account.pwd;

        //本来是等返回结果再 继续判断的，变成 把要判断的 放到回调函数里 还要注意参数
        authenticate(userName,hashPwd,function(rslt){
        	if(rslt === 0){
                res.redirect('userhome'+'?username='+userName+'&usertel='+userTel);
        	}else{
                res.render('login');
        	}
        })        
    }else{
    	res.render('login');
    }
}


router.get("/",function(req,res,next){
    isLogined(req,res);
});


router.post('/',function(req,res,next){

   var userTel = req.body.inputtel;
   var yzm = req.body.inputyzm;
   var hashYzm = hashOperate(userTel,yzm);
   authenticateTel(userTel,hashYzm,function(rslt){
	    switch(rslt){
	   	  case 0:
	   	     getLastLoginTime(req,res,userTel);
	   	     break;
	   	  case 1:
	   	     console.log('用户名验证码错误');
	         res.render('login', {errmsg:"用户名验证码错误"});
             break;
	   	  default:
	   	     console.log('用户名不存在');
	   	     res.render('login');
	   	     break;       
	   }  	
	});
});


router.post('/verifytel',function(req,res,next){
   loginVerifyteTel(req.body['telNo'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:true,errmsg:'手机号OK'});
                break;
          default:
                res.json({isok:false,errmsg:' ! 手机号未注册'});
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

module.exports = router;