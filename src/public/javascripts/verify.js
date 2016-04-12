define(function(){
    var wait = 60;
	return{
		getyzm : function time(o){
		        if (wait === 0) {  
		            o.removeAttribute("disabled");            
		            o.innerHTML="获取验证码";  
		            wait = 60;  
		        } else {  
		            o.setAttribute("disabled", true);  
		            o.innerHTML="重新发送(" + wait + ")";  
		            wait--;  
		            setTimeout(function() {  
		                time(o);  
		            },  
		            1000);  
		        } 
		}
	};
});