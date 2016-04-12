define(function(){

    function move(obj,iTarget,fn){
        clearInterval(obj.timer);
        var cur = obj.offsetLeft;
        obj.timer = setInterval(function(){
            var speed=(iTarget - cur) / 5;
            speed = speed > 0 ?Math.ceil(speed):Math.floor(speed);
            if(cur == iTarget){
                clearInterval(obj.timer);
                if(fn) fn();
            }else{
                cur += speed;
                obj.style.left = cur + "px";
            }
        },30);
        // console.log(obj.style.left);
        // console.log(now);
    }

    function whichTransitionEvent(){
          var t;
          var el = document.createElement('one');
          var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
          };

          for(t in transitions){
              if( el.style[t] !== undefined ){
                  return transitions[t];
              }
          }
   }

    return {
        doCarousel : function(myCarousel){
            console.log(myCarousel);
            var lis = myCarousel.getElementsByTagName("ol")[0].getElementsByTagName("li");
            var carouselinner = myCarousel.getElementsByClassName("carousel-inner")[0];
            var now = 0;
            var tx = 0;
            var x = 0;
            var n = 0;
            var lislength=0;
            // 需要初始化值
            carouselinner.style.left = "0px";

            for(var i=0;i<lis.length;i++){
                lislength = lislength + parseFloat(lis[i].offsetWidth);
            }
            //获得条和父容器宽度差 
            var lenX = lislength % parseFloat(myCarousel.offsetWidth);
            //可以拉动几次
            var lnum = Math.floor(lislength / parseFloat(myCarousel.offsetWidth));

            console.log(lislength);
            console.log(myCarousel.offsetWidth);
            console.log(lenX);
            console.log(lnum);


            //少于一个屏幕宽就不用拉动
            if(lenX <=0) return;

            carouselinner.addEventListener("touchstart", handleTouchStart, false);
            carouselinner.addEventListener("touchmove", handleTouchMove, false);
            carouselinner.addEventListener("touchend", handleTouchEnd, false);

            function tab(){
                carouselinner.timer = null;

                if(now>lnum-1)
                   carouselinner.style.left = (-1 *  lenX  * now) + 'px';
                   // move(carouselinner,(-1 *  lenX  * now));
                else  
                   carouselinner.style.left = (-1 *  parseFloat(myCarousel.offsetWidth)  * now) + 'px'; 
                   // move(carouselinner,(-1 *  parseFloat(myCarousel.offsetWidth)  * now));
            }

            function prev(){
                carouselinner.style.transition="all 300ms ease";
                now--;
                if(now < 0 ) now = 0;
                tab();
            }

            function next(){
                 carouselinner.style.transition="all 300ms ease";
                 now++;
                 //因为就n个屏幕宽 所以只有n次操作
                 if(now >= lnum) now = lnum;
                 tab();
            }

            function handleTouchStart(e){
                        carouselinner.style.transition="none";
                        tx = parseFloat(carouselinner.style.left);    
                        x =  parseFloat(e.touches[0].pageX);
            }
            function handleTouchMove(e){
                         n =  parseFloat(e.touches[0].pageX)  - x;
                         carouselinner.style.left = tx + n + "px";     
            }
            function handleTouchEnd(e){
                      if(n>0){
                            if(n > lenX/3){
                                 prev();
                            }else{
                                 now--;
                                 next();
                            }
                      }
                       if(n<0){
                            if(n < -1*lenX/3){
                                 next();
                            }else{
                                 now++;
                                 prev();
                            }
                      }
                      carouselinner.style.transition="all 300ms ease";
            }            

            function cancelTouch(){
                    carouselinner.removeEventListener("touchstart", handleTouchStart, false);
                    carouselinner.removeEventListener("touchmove", handleTouchMove, false);
                    carouselinner.removeEventListener("touchend", handleTouchEnd, false);
            }
            function resetTouch(){
                    carouselinner.addEventListener("touchstart", handleTouchStart, false);
                    carouselinner.addEventListener("touchmove", handleTouchMove, false);
                    carouselinner.addEventListener("touchend", handleTouchEnd, false);   
            }
        },
        doCarouselTouch : function(myCarousel){
            var abtn = myCarousel.getElementsByTagName("ol")[0].getElementsByTagName("li");
            var carouselinner = myCarousel.getElementsByClassName("carousel-inner")[0];
            var items = carouselinner.getElementsByClassName("item");
            var now = 0;
            var tx = 0;
            var x = 0;
            var n = 0;
            // 需要初始化值
            carouselinner.style.left = "0px";

            carouselinner.addEventListener("touchstart", handleTouchStart, false);
            carouselinner.addEventListener("touchmove", handleTouchMove, false);
            carouselinner.addEventListener("touchend", handleTouchEnd, false);

            function tab(){
                for(var i = 0;i<abtn.length;i++){
                    abtn[i].className = "";
                }
                abtn[now].className = "active";
                carouselinner.timer = null;
                // move(carouselinner,(-1 * myCarousel.offsetWidth * now));
                carouselinner.style.left = (-1 * myCarousel.offsetWidth * now) + 'px';
            }


            function prev(){
                carouselinner.style.transition="all 300ms ease";
                now--;
                if(now < 0 ) now = 0;
                tab();
            }

            function next(){
                 carouselinner.style.transition="all 300ms ease";
                 now++;
                 if(now > abtn.length-1) now = abtn.length-1;
                 tab();
            }

            function handleTouchStart(e){
                        carouselinner.style.transition="none";
                        tx = parseFloat(carouselinner.style.left);    
                        x =  parseFloat(e.touches[0].pageX);
            }
            function handleTouchMove(e){
                         n =  parseFloat(e.touches[0].pageX)  - x;
                         carouselinner.style.left = tx + n + "px";     
            }
            function handleTouchEnd(e){
                      if(n>0){
                            if(n > myCarousel.offsetWidth/3){
                                 prev();
                            }else{
                                 now--;
                                 next();
                            }
                      }
                       if(n<0){
                            if(n < -1*myCarousel.offsetWidth/3){
                                 next();
                            }else{
                                 now++;
                                 prev();
                            }
                      }
                      carouselinner.style.transition="all 300ms ease";
            }            

            function cancelTouch(){
                    carouselinner.removeEventListener("touchstart", handleTouchStart, false);
                    carouselinner.removeEventListener("touchmove", handleTouchMove, false);
                    carouselinner.removeEventListener("touchend", handleTouchEnd, false);
            }
            function resetTouch(){
                    carouselinner.addEventListener("touchstart", handleTouchStart, false);
                    carouselinner.addEventListener("touchmove", handleTouchMove, false);
                    carouselinner.addEventListener("touchend", handleTouchEnd, false);   
            }

        },
        doCarouselTouchCircle : function(myCarousel){
            //该轮播 采取的是在父容器中横向排列移动父容器的left显示 对应内容 ，头尾各增加 额外的item
            //在 头加一个尾巴 在尾巴加一个头 当轮播到 加上的头尾 后直接切到真实的头尾
            //真实的 头尾为 去掉加入的第一个和最后一个的部分 
            var abtn = myCarousel.getElementsByTagName("ol")[0].getElementsByTagName("li");
            var carouselinner = myCarousel.getElementsByClassName("carousel-inner")[0];
            var items = carouselinner.getElementsByClassName("item");
            var timer = null;

            var initposition = 1;
            var lastposition = items.length-2;
            var now = initposition;
            var tx = 0;
            var x = 0;
            var n = 0;


            var transitionEvent = whichTransitionEvent();  
            if(transitionEvent){
              carouselinner.addEventListener(transitionEvent, function() {  
                     if(now > lastposition){
                        carouselinner.style.transition="none";
                        now = initposition;
                        carouselinner.style.left =  (-1 * myCarousel.offsetWidth * now) + "px";
                     }
                     if(now < initposition){
                        carouselinner.style.transition="none";
                        now = lastposition;
                        carouselinner.style.left =  (-1 * myCarousel.offsetWidth * now) + "px";
                     }
                     console.log('next'+now);
              }); 
            }

            carouselinner.style.left = -1 * myCarousel.offsetWidth + "px";

            function tab(){
                console.log(now);
                for(var i = 0;i<abtn.length;i++){
                    abtn[i].className = "";
                }

                if(now == items.length-1){
                    abtn[initposition].className = "active";
                }else if(now === 0){
                    abtn[lastposition].className = "active";
                }else{
                    abtn[now].className = "active";
                }

                carouselinner.style.left = (-1 * myCarousel.offsetWidth * now) + "px";
            }

            function next(){
                carouselinner.style.transition="all 300ms ease";
                now ++ ;
                console.log('next'+now);
                tab();
            }
             function prev(){
                carouselinner.style.transition="all 300ms ease";
                now -- ;
                console.log('next'+now);
                tab();
            }

            timer = setInterval(next,4000);
            carouselinner.addEventListener("touchstart", handleTouchStart, false);
            carouselinner.addEventListener("touchmove", handleTouchMove, false);
            carouselinner.addEventListener("touchend", handleTouchEnd, false);

            function handleTouchStart(e){
                        carouselinner.style.transition="none";
                        clearInterval(timer);
                        tx = parseFloat(carouselinner.style.left);    
                        x =  parseFloat(e.touches[0].pageX);
            }
            function handleTouchMove(e){
                         clearInterval(timer);
                         n =  parseFloat(e.touches[0].pageX)  - x;
                         carouselinner.style.left = tx + n + "px";     
            }
            function handleTouchEnd(e){
                      cancelTouch();
                      if(n>0){
                            if(n > myCarousel.offsetWidth/3){
                                 prev();
                            }else{
                                 next();
                            }
                      }
                       if(n<0){
                            if(n < -1*myCarousel.offsetWidth/3){
                                 next();
                            }else{
                                 prev();
                            }
                      }
                      carouselinner.style.transition="all 300ms ease";
                      resetTouch();
            }
            function cancelTouch(){
                    carouselinner.removeEventListener("touchstart", handleTouchStart, false);
                    carouselinner.removeEventListener("touchmove", handleTouchMove, false);
                    carouselinner.removeEventListener("touchend", handleTouchEnd, false);
            }
            function resetTouch(){
                    timer = setInterval(next,4000);
                    carouselinner.addEventListener("touchstart", handleTouchStart, false);
                    carouselinner.addEventListener("touchmove", handleTouchMove, false);
                    carouselinner.addEventListener("touchend", handleTouchEnd, false);   
            }
        }
    };
});