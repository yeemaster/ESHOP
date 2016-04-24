define(["zepto","Carousel","Timing","gotop"], function($,Carousel,Timing,gotop){

   return {
       deal_index_main: function(){
             Carousel.doCarouselTouchCircle(document.getElementById("index-area-myCarousel"));
             Carousel.doCarouselTouch(document.getElementById("index-catg-myCarousel"));
             Carousel.doCarousel(document.getElementsByClassName("static-container")[0]);
             Timing.getTiming(document.getElementsByClassName("countdown")[0]);
             gotop.gtop(document.getElementsByClassName("goTop")[0]);
       }
   };
});