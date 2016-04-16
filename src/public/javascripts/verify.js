define(function(){
    var yzmwait = 60;
    var tiaozhuanwait = 3;
	return{
		getyzm : function yzmtime(o){
		        if (yzmwait === 0) {  
		            o.removeAttribute("disabled");            
		            o.innerHTML="获取验证码";  
		            yzmwait = 60;  
		        } else {  
		            o.setAttribute("disabled", true);  
		            o.innerHTML="重新发送(" + yzmwait + ")";  
		            yzmwait--;  
		            setTimeout(function() {  
		                yzmtime(o);  
		            },  
		            1000);  
		        }
		    },
		  gettiaozhuan:function tiaozhuantime(o){
		        if (tiaozhuanwait === 0) {  
		            o.removeAttribute("disabled");            
		            o.innerHTML="跳转！";  
		            tiaozhuanwait = 3;  
		        } else {  
		            o.setAttribute("disabled", true);  
		            o.innerHTML="注册成功(" + tiaozhuanwait + ")秒后跳转，登录页面！";  
		            tiaozhuanwait--;  
		            setTimeout(function() {  
		                tiaozhuantime(o);  
		            },  
		            1000);  	
		        }	  	
		  }
	};
});