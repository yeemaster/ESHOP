define(function(){

    function _onStateChange(xhr, success, failure) {  
        if (xhr.readyState == 4) {  
            var s = xhr.status;  
            if (s >= 200 && s < 300) {  
                success(xhr);  
            } else {  
                failure(xhr);  
            }  
        } else {  
        }  
    } 


	return{
		//  Ajax.request({  
		//     url : path + "/report/topn/topn_data.jsp",  
		//     data : {  
		//         datatype : datatype  
		//     },  
		//     success : function(xhr) {  
		//         onData(xhr.responseText);
		//     },  
		//     error : function(xhr) {  
		          
		//     }  
		// }); 
	    send : function request(opt) {  
	        function fn() {  
	        }  
	        var url = opt.url || "";  
	        var async = opt.async !== false, method = opt.method || 'GET', data = opt.data  || null, success = opt.success || fn, error = opt.failure || fn;  
	        method = method.toUpperCase();  
	        if (method == 'GET' && data) {  
	            var args = "";  
	            if(typeof data == 'string'){  
	                //alert("string")  
	            args = data;  
	            }else if(typeof data == 'object'){  
	                //alert("object")  
	                var arr = [];  
	                for(var k in data){  
	                    var v = data[k];  
	                    arr.push(k + "=" + v);  
	                }  
	                args = arr.join("&");  
	            }  
	        url += (url.indexOf('?') == -1 ? '?' : '&') + args;  
	            data = null;  
	        }  
	        var xhr = window.XMLHttpRequest ? new XMLHttpRequest()  
	                : new ActiveXObject('Microsoft.XMLHTTP');  
	        xhr.onreadystatechange = function() {  
	            _onStateChange(xhr, success, error);  
	        };  
	        xhr.open(method, url, async);  
	        if (method == 'POST') {  
	        	console.log('post');
	            xhr.setRequestHeader('Content-type',  
	                    'application/x-www-form-urlencoded;charset=utf-8');  
	        }  
	        xhr.send(data);  
	        console.log('ajax');
	        console.log(data.telNo);
	        return xhr;  
	    }  
	};
});