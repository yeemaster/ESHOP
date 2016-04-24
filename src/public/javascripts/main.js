(function(win){

    //配置baseUrl
    /*
     * 文件依赖
     */
    var config = {
        baseUrl: "../",           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            "zepto": "libs/zepto.min",
            "Carousel": "javascripts/Carousel",
            "Timing": "javascripts/timing",
            "verify": "javascripts/verify",
            "ajax": "javascripts/ajax",
            "jquery": "libs/jquery-2.1.4.min",            
            "indexmain": "javascripts/index-main",
            "registermain": "javascripts/register-main",
            "loginmain": "javascripts/login-main",
            "gotop":"javascripts/gotop",  
            "rqmyglobal":"../models/rqmyglobal",
            "hotelmain": "javascripts/hotel-main",
            "hoteldetailmain": "javascripts/hoteldetail-main",
            "hoteldescmain": "javascripts/hoteldesc-main"
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。
                zepto: {
                    exports: "$"
                }
        }   
    };   

    require.config(config);
    require(["indexmain","registermain","loginmain","rqmyglobal","hotelmain","hoteldetailmain","hoteldescmain"],
     function(indexmain,registermain,loginmain,rmgl,hotelmain,hoteldetailmain,hoteldescmain){
         var selected = document.getElementsByTagName('body')[0].getAttribute('webtitle');
         console.log(selected);
         console.log("now server:" + rmgl.net);
         switch(selected){
         	case 'index_html': indexmain.deal_index_main();break;
         	case 'register_html': registermain.deal_register_main();break;
         	case 'login_html': loginmain.deal_login_main();break;
            case 'hotel_html': hotelmain.deal_hotel_main();break;
            case 'hoteldetail_html': hoteldetailmain.deal_hoteldetail_main();break;
            case 'hoteldesc_html': hoteldescmain.deal_hoteldesc_main();break;
         	default: break;
         }
    });
})(window);