define(["gotop"], function(gotop){
	return{
		deal_hotel_main:function(){
			 var pageheight =  document.body.scrollHeight;
             gotop.gtop(document.getElementsByClassName("goTop")[0]);
             var fsh = document.getElementsByClassName("filter-sort-head")[0];
             var fli = fsh.getElementsByTagName("li");
             var fsb = document.getElementsByClassName("filter-sort-body")[0];
             var secbp = fsb.getElementsByClassName("body-part");
             var fs = document.getElementsByClassName("filter-sort")[0];
             var fsm = document.getElementsByClassName("filter-sort-mask")[0];

             for(var i=0;i<fli.length;i++){
             	fli[i].tagindex = i;
             }

             fsh.addEventListener("click",function(e){
             	 fs.className = "filter-sort userselected"; //置顶
                 //mask
             	 fsm.style.backgroundColor = "rgba(0,0,0,0.5)";
             	 fsm.style.height = pageheight + "px";

                 if(e.target && e.target.nodeName.toLowerCase() == "li"){
 
                 	for(var j=0;j<secbp.length;j++){
                 	    fli[j].className = "filter-sort head-tab";
                 		secbp[j].style.display = "none";
                 	}
                 	secbp[e.target.tagindex].style.display = "block";
                 	fli[e.target.tagindex].className = "filter-sort head-tab selected";
                 }
             });

             fsm.addEventListener("click",function(e){
             	 fs.className = "filter-sort";
                 fsm.style.backgroundColor = "rgba(0,0,0,0)";
                 var timer = setTimeout(function(){
                         fsm.style.height = 0  + "";
                 },300);
                 for(var j=0;j<secbp.length;j++){
             	    fli[j].className = "filter-sort head-tab";
             		secbp[j].style.display = "none";
             	 }
             }); 
		}
	};
});