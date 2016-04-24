define(["Carousel","gotop"], function(Carousel,gotop){
	return{
		deal_hoteldesc_main:function(){
              Carousel.doCarousel(document.getElementsByClassName("static-container")[0]);
              gotop.gtop(document.getElementsByClassName("goTop")[0]);
		}
	};
});