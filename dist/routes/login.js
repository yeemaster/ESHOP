var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var userModel = require('../models/accounts');

function hashOperate(obj1,obj2){
  var hash =crypto.createHash('md5');
  hash.update(obj1+obj2);
  return hash.digest('hex');
}

function authenticate(userName,hashPwd,callback){
  if(!userModel){
     callback(2);  //连接中断
     return;
  }
  var query = userModel.findOne().where('username',userName);
  query.exec(function(err,doc){
       if(err){
        callback(2);  //连接中断
        return;
       }
       if(doc){
           if(doc.hashpwd === hashPwd) callback(0)  //密码正确 
           else callback(1);    //密码不正确                     
       }else{
           callback(3);         //用户名不存在 
       }
  });
}

function isLogined(req,res){
    if(req.cookies['account']!=null){
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
    isLogined(req,res);   //如果之前已经登录过 cookie里还保存用户信息 就不再登录
});


function getLastLoginTime(req,res,userTel){
	if(!userModel){
    console.log('getLastLoginTime userModel err');
		return;
	}
	var loginTime = Date().toString();
	userModel.findOne({usertel:userTel},function(err,doc){
        if(err) console.log('getLastLoginTime err');
        if(doc)
        {
          console.log(doc.username);
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

function authenticateTel(userTel,hashYzm,callback){
  if(!userModel){
    callback(2);          //连接中断
    return;
  }
  var query = userModel.findOne().where('usertel',userTel);
  query.exec(function(err,doc){
       if(err){
        callback(2);                //连接中断
        return;
       }
       if(doc){
         if(doc.hashyzm === hashYzm) callback(0)  //手机存在 验证码正确
         else callback(1);           //手机存在 验证码不正确
       }else{
          callback(3);//手机号未注册
       }
  });
}

router.post('/isgouserhome',function(req,res,next){
   var userTel = req.body.inputtel;
   var yzm = req.body.inputyzm;
   var hashYzm = hashOperate(userTel,yzm);
   authenticateTel(userTel,hashYzm,function(rslt){
      switch(rslt){
        case 0:
           console.log('登录成功');
           // res.render('login', {errmsg:"验证码错误"});
           res.json({isok:true,errmsg:'登录成功'});        
           break;
        case 1:
           res.json({isok:false,errmsg:'验证码错误'});
           break;
        case 3:
           res.json({isok:false,errmsg:'手机号未注册'});
           break;           
        default:
           res.json({isok:false,errmsg:'连接中断'});
           break;       
     }    
  });
});

router.post('/',function(req,res,next){
    var userTel = req.body.inputtel;
    getLastLoginTime(req,res,userTel);
});


function loginVerifyteTel(userTel,callback){
  if(!userModel){
    callback(2); //连接中断
    return;
  }
  var query = userModel.findOne().where('usertel',userTel);
  query.exec(function(err,doc){
       if(err){
          callback(2);  //连接中断
          return;
       }
       if(doc){
          callback(0);  //手机号OK
       }else{
          callback(1);  //手机号未注册
       }

  });
}

router.post('/verifytel',function(req,res,next){
   loginVerifyteTel(req.body['telNo'],function(rslt){
        switch(rslt){
          case 0:
                res.json({isok:true,errmsg:'手机号OK'});
                break;
          case 1:
                res.json({isok:false,errmsg:'手机号未注册'});
                break;                
          default:
                res.json({isok:false,errmsg:'连接中断'});
                break;
        }
   });
});


module.exports = router;