define(function(){

  var d = new Date();
  var riqi = '' + d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate();
  console.log(riqi);

  return{
   	    getTiming : function(block){
			   	  	  function GetRTime(){
					    var EndTime= new Date(riqi + ' 22:59:59');
					    var NowTime = new Date();
					    var t =EndTime.getTime() - NowTime.getTime();
					    if(t < 0) t = 0;
					    var day=0;
					    var hour=0;
					    var minute=0;
					    var second=0;
					    if(t>=0){
					      day=Math.floor(t/1000/60/60/24);
					      hour=Math.floor(t/1000/60/60%24);
					      minute=Math.floor(t/1000/60%60);
					      second=Math.floor(t/1000%60);
					    }
					    // document.getElementById("t_d").innerHTML = d + "天";
                        // 补零
				        if (day < 10) {
				            day = "0" + day;
				        }
				        if (hour < 10) {
				            hour = "0" + hour;
				        }
				        if (minute < 10) {
				            minute = "0" + minute;
				        }
				        if (second < 10) {
				            second = "0" + second;
				        }
					    block.getElementsByClassName("hour")[0].innerHTML = hour + "";
					    block.getElementsByClassName("minute")[0].innerHTML = minute + "";
					    block.getElementsByClassName("second")[0].innerHTML = second + "";
					  }
					  setInterval(GetRTime,0);
   	    }
    };
});