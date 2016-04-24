define(["Carousel","gotop"], function(Carousel,gotop){
	return{
		deal_hoteldetail_main:function(){
             Carousel.doCarousel(document.getElementsByClassName("static-container")[0]);
             Carousel.doCarousel(document.getElementsByClassName("static-container")[1]);
             gotop.gtop(document.getElementsByClassName("goTop")[0]);
		}
	};
});