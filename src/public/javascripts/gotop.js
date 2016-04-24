define(function(){
    var pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	return{
        gtop:function(ato){
            window.onscroll = function(){
            	var top  = document.body.scrollTop | document.documentElement.scrollTop;

            	if( top > pageHeight){
            		ato.style.display = "block";
            	}else{
            		ato.style.display = "none";
            	}
            }; 
        }
	};
});