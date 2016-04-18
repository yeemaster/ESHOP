  var crypto = require("crypto");
  var count = 35;


  function hashOperate(obj1,obj2){
    var hash =crypto.createHash("md5");
    hash.update(obj1+obj2);
    return hash.digest("hex");
  }

  function checkClose(){
    count = count -1;

    if(count == 0) {
       mongoose.disconnect();
       console.log("db close");
    }
  }


  //引入
  var mongoose = require("mongoose");
  //创建链接
  var db = mongoose.createConnection("mongodb://127.0.0.1:27017/eshop");
  //测试
  db.on("error",console.error.bind(console,"connection error"));

  //打开
  db.once("open",function(){

  console.log("mongoose opened!");
 
  //Schema 
  var userSchema = new mongoose.Schema({
      username:{type:String,unique:true},
      usertel:{type:String,unique:true},
      hashpwd:{type:String},
      hashyzm:{type:String},
      lastlogintime:{type:String}
  });

  //实体
  var userModel = db.model("col_accounts",userSchema);

  //
  var userEntity = new userModel({
    username:"admin",usertel:"18046040955",hashpwd:hashOperate("admin","111111"),hashyzm:hashOperate("18046040955","111111"),lastlogintime:""
   }
  );

  userEntity.save(function(err,doc){
    if(err) console.log(err);
    else console.log(doc.username + " saved");
  });

  userEntity = new userModel({
    username:"yequan",usertel:"18046521243",hashpwd:hashOperate("yequan","222222"),hashyzm:hashOperate("18046521243","222222"),lastlogintime:""
  });

  userEntity.save(function(err,doc){
    if(err) console.log(err);
    else console.log(doc.username + "saved");
  });


//Schema 
var proSchema = new mongoose.Schema(
{
    "name" :    {type:String},
    "headimg" : {type:String},
    "score":  {type:Number},
    "store":  {type:String},
    "addr":   {type:String},
    "desc":   {type:String},
    "type":   {type:Number},
    "remai":  {type:Number},
    "city":   {type:String},
  "point-x":  {type:Number},
  "point-y":  {type:Number},
    "items": 
    [
        {
            "item-id": {type:String},
            "item-desc" : {type:String},
            "item-price-line": {type:Number},
            "item-old-price": {type:Number},
            "item-bought": {type:String},
            "item-img": {type:String},
            "item-detail": {
                 "item-detail-name":{type:String},
                 "item-detail-img": {type:String},
                 "item-detail-desc":{type:String},
                 "item-detail-suibiantui": {type:Boolean},
                 "item-detail-shengyujitian": {type:Number},
                 "item-detail-score": {type:Number},
                 "item-detail-content": {type:String},
                 "item-detail-commentcount": {type:Number},
                 "item-detail-comment":[
                    {
                       "comment-name":{type:String},
                       "comment-date":{type:String},
                       "comment-score": {type:Number},
                       "comment-conetnt":{type:String}
                    }
                 ]
            }
        }
    ]
}
);

//实体
var proModel = db.model("col_proitems",proSchema);



var userLikeSchema = new mongoose.Schema(
  {
    "name":{type:String},
    "objid":{type:String},
    "preobjid":{type:String},
    "desc":{type:String},
    "price":{type:Number},
    "old-price":{type:Number},
    "privilege":{type:String},
    "bought":{type:String},
    "store":{type:String},
    "img": {type:String}
  }
);

//实体
var userLikeModel = db.model("col_userlikes",userLikeSchema);


  //
  var proArray = [
       {
            "name" : "锦江之星北京奥体中心店",
            "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
            "score": 4.6,
            "store": "对外经贸",
            "addr":"北京安定门外安苑里1号 北京奥林匹克体育中心东门东侧 紧邻安贞门地铁站",
            "desc": "仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
            "type": 0,
            "remai": 0,
            "city": "北京",
            "point-x":116.414557,
            "point-y":39.988952,
            "items": 
            [
                {
                    "item-id": "1",
                    "item-desc" : "锦江之星北京奥体中心店入住1晚，房型2...",
                    "item-price-line": 218,
                    "item-old-price": 398,
                    "item-bought": "2094",
                    "item-img": "images/hotel-page/article/hotelimg01.jpg",
                    "item-detail": {
                         "item-detail-name":"锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }
                },
                {
                    "item-id": "2",
                    "item-desc" : "锦江之星北京奥体中心店商务房A入住4小...",
                    "item-price-line": 96,
                    "item-old-price": 120,
                    "item-bought": "67",
                    "item-img": "images/hotel-page/article/hotelimg02.jpg",                    
                    "item-detail": {
                         "item-detail-name":"2锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }          
                },
                {
                    "item-id": "3",
                    "item-desc" : "锦江之星北京奥体中心店商务套房4小时入......",
                    "item-price-line": 108,
                    "item-old-price": 180,
                    "item-bought":"12",
                    "item-img": "images/hotel-page/article/hotelimg03.jpg",                    
                    "item-detail": {
                         "item-detail-name":"3锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }     
                }
            ]
        },
        {
            "name" : "速8酒店北京东四店",
            "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
            "score": 4.2,
            "store": "东四",
            "addr":"北京安定门外安苑里1号 北京奥林匹克体育中心东门东侧 紧邻安贞门地铁站",
            "desc": "仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
            "type": 0,
            "remai": 0,
            "city": "北京",
            "point-x":116.414557,
            "point-y":39.988952,
            "items": 
            [
                {
                    "item-id": "1",
                    "item-desc" : "速8酒店北京东四店入住1晚，标准间A/...",
                    "item-price-line": 169,
                    "item-old-price": 398,
                    "item-bought": "828",
                    "item-img": "images/hotel-page/article/hotelimg05.jpg",
                    "item-detail": {
                         "item-detail-name":"锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }
                },
                {
                    "item-id": "2",
                    "item-desc" : "速8酒店北京东四店入住4小时，免费Wi...",
                    "item-price-line": 68,
                    "item-old-price": 98,
                    "item-bought": "559",
                    "item-img": "images/hotel-page/article/hotelimg06.jpg",                    
                    "item-detail": {
                         "item-detail-name":"2锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }          
                }
            ]
        },
        {
            "name" : "紫星北京奥体中心店",
            "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
            "score": 4.9,
            "store": "回龙观",
            "addr":"北京安定门外安苑里1号 北京奥林匹克体育中心东门东侧 紧邻安贞门地铁站",
            "desc": "仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
            "type": 0,
            "remai": 0,
            "city": "北京",
            "point-x":116.414557,
            "point-y":39.988952,
            "items": 
            [
                {
                    "item-id": "1",
                    "item-desc" : "锦江之星北京奥体中心店入住1晚，房型2...",
                    "item-price-line": 218,
                    "item-old-price": 398,
                    "item-bought": "2094",
                    "item-img": "images/hotel-page/article/hotelimg01.jpg",
                    "item-detail": {
                         "item-detail-name":"锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }
                },
                {
                    "item-id": "2",
                    "item-desc" : "锦江之星北京奥体中心店商务房A入住4小...",
                    "item-price-line": 96,
                    "item-old-price": 120,
                    "item-bought": "67",
                    "item-img": "images/hotel-page/article/hotelimg02.jpg",                    
                    "item-detail": {
                         "item-detail-name":"2锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }          
                },
                {
                    "item-id": "3",
                    "item-desc" : "锦江之星北京奥体中心店商务套房4小时入......",
                    "item-price-line": 108,
                    "item-old-price": 180,
                    "item-bought":"12",
                    "item-img": "images/hotel-page/article/hotelimg03.jpg",                    
                    "item-detail": {
                         "item-detail-name":"3锦江之星北京奥体中心店",
                         "item-detail-img": "images/home-detail-page/article/hoteldetailimg01.jpg",
                         "item-detail-desc":"仅218元！价值398元的锦江之星北京奥体中心店入住1晚，标准间A/商务间A2选1，免费WiFi。",
                         "item-detail-suibiantui": true,
                         "item-detail-shengyujitian": 7,
                         "item-detail-score": 4.1,
                         "item-detail-content":"",
                         "item-detail-commentcount": 6,
                         "item-detail-comment":[
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            },
                            {
                               "comment-name":"7106470",
                               "comment-date":"2016-01-15",
                               "comment-score": 4,
                               "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                            }
                         ]
                    }     
                }
            ]
        },
        {
                    "name" : "金鼎轩",
                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                    "score": 4.9,
                    "store": " ",
                    "addr":" ",
                    "desc": "仅售95元，价值100元代金券！可叠加使用！时间在这里不老，美味在这里不歇！ ",
                    "type": 0,
                    "remai":1,
                    "city": "北京",
                    "point-x":116.414557,
                    "point-y":39.988952,
                    "items": 
                    [
                        {
                            "item-id": "1",
                            "item-desc" : "金鼎轩100元代金券",
                            "item-price-line": 95,
                            "item-old-price": 100,
                            "item-bought": "16万",
                            "item-img": "images/eshop/pic/jdx63d9f2d3572c11df989a7a15642762d0f703c2b9.jpg",
                            "item-detail": {
                                 "item-detail-name":"金鼎轩",
                                 "item-detail-img": "images/eshop/pic/jdxhead63d9f2d3572c11df989a7a15642762d0f703c2b9.jpg",
                                 "item-detail-desc":"仅售95元，价值100元代金券！可叠加使用！时间在这里不老，美味在这里不歇！ ",
                                 "item-detail-suibiantui": true,
                                 "item-detail-shengyujitian": 7,
                                 "item-detail-score": 4.1,
                                 "item-detail-content":"",
                                 "item-detail-commentcount": 6,
                                 "item-detail-comment":[
                                    {
                                       "comment-name":"elinor0913",
                                       "comment-date":"2016-04-14",
                                       "comment-score": 4,
                                       "comment-conetnt":"有这样一种食物，不仅营养丰富，而且还具有提高免疫功能，降血压、血糖、防癌等保健功效。爱它的人怎么吃都喜欢，讨厌它的人，闻到味道都避之不及。其实它的另一个很少有人知道的身份：「血管清道夫」，但它还有更多不为人知的身份，小道先告诉你："
                                    },
                                    {
                                       "comment-name":"东旭sun",
                                       "comment-date":"2016-03-28",
                                       "comment-score": 4,
                                       "comment-conetnt":"再一次过来吃，服务和上菜速度相比上次提升很多，可能人不是很多的原因。这次主要想尝试一下他家的酥点，味道一般，和路边点心店水平类似。【羊城叉烧酥】外皮酥脆，层次很多，口感还不错，但味道一般，口味较淡。"
                                    },
                                    {
                                       "comment-name":"7106470",
                                       "comment-date":"2016-01-15",
                                       "comment-score": 4,
                                       "comment-conetnt":"房间很干净，步行到鸟巢20分钟，价格也不错！"
                                    }
                                 ]
                            }
                        }
                    ]
        },
        {
                            "name" : "胡大饭店",
                            "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                            "score": 4.9,
                            "store": " ",
                            "addr":" ",
                            "desc": "仅售95元，价值100元代金券！可使用包间，免费停车，免费WiFi！",
                            "type": 0,
                            "remai": 1,
                            "city": "北京",
                            "point-x":116.414557,
                            "point-y":39.988952,
                            "items": 
                            [
                                {
                                    "item-id": "1",
                                    "item-desc" : "胡大饭馆代金券",
                                    "item-price-line": 95,
                                    "item-old-price": 100,
                                    "item-bought": "2.0万" ,
                                    "item-img": "images/eshop/pic/hdfda8773912b31bb051dec15b63317adab44bede090.jpg",
                                    "item-detail": {
                                         "item-detail-name":"胡大饭店",
                                         "item-detail-img": "images/eshop/pic/hdfdheada8773912b31bb051dec15b63317adab44bede090.jpg",
                                         "item-detail-desc":"仅售95元，价值100元代金券！可使用包间，免费停车，免费WiFi！ ",
                                         "item-detail-suibiantui": true,
                                         "item-detail-shengyujitian": 7,
                                         "item-detail-score": 4.1,
                                         "item-detail-content":"",
                                         "item-detail-commentcount": 6,
                                         "item-detail-comment":[
                                            {
                                               "comment-name":"嘉瑞宝宝团队",
                                               "comment-date":"2016-04-14",
                                               "comment-score": 4,
                                               "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                            },
                                            {
                                               "comment-name":"东旭sun",
                                               "comment-date":"2016-03-28",
                                               "comment-score": 4,
                                               "comment-conetnt":"再一次过来吃，服务和上菜速度相比上次提升很多，可能人不是很多的原因。这次主要想尝试一下他家的酥点，味道一般，和路边点心店水平类似。【羊城叉烧酥】外皮酥脆，层次很多，口感还不错，但味道一般，口味较淡。"
                                            },
                                            {
                                               "comment-name":"7106470",
                                               "comment-date":"2016-01-15",
                                               "comment-score": 4,
                                               "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                            }
                                         ]
                                    }
                                }
                            ]
            },
            {
                                    "name" : "北京国际鲜花港",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售59元，价值80元鲜花港郁金香文化节成人票！节假日通用！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "鲜花港郁金香文化节成人票",
                                            "item-price-line": 95,
                                            "item-old-price": 100,
                                            "item-bought": "1.0万" ,
                                            "item-img": "images/eshop/pic/bjgjxhgd439b6003af33a87f52f0f53c15c10385343b53c.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"北京国际鲜花港",
                                                 "item-detail-img": "images/eshop/pic/bjgjxhgheadd439b6003af33a87f52f0f53c15c10385343b53c.jpg",
                                                 "item-detail-desc":"仅售59元，价值80元鲜花港郁金香文化节成人票！节假日通用！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"嘉瑞宝宝团队",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    },
                                                    {
                                                       "comment-name":"东旭sun",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"再一次过来吃，服务和上菜速度相比上次提升很多，可能人不是很多的原因。这次主要想尝试一下他家的酥点，味道一般，和路边点心店水平类似。【羊城叉烧酥】外皮酥脆，层次很多，口感还不错，但味道一般，口味较淡。"
                                                    },
                                                    {
                                                       "comment-name":"7106470",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },
              {
                                    "name" : "北平楼",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售95元，价值100元代金券！可叠加使用，节假日通用，提供免费WiFi！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "北平楼100元代金券",
                                            "item-price-line": 95,
                                            "item-old-price": 100,
                                            "item-bought": "1.2万" ,
                                            "item-img": "images/eshop/pic/bpl0e2442a7d933c895293841cfd71373f0830200c4.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"北平楼",
                                                 "item-detail-img": "images/eshop/pic/bplhead0e2442a7d933c895293841cfd71373f0830200c4.jpg",
                                                 "item-detail-desc":"仅售95元，价值100元代金券！可叠加使用，节假日通用，提供免费WiFi！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"嘉瑞宝宝团队",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    },
                                                    {
                                                       "comment-name":"东旭sun",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"再一次过来吃，服务和上菜速度相比上次提升很多，可能人不是很多的原因。这次主要想尝试一下他家的酥点，味道一般，和路边点心店水平类似。【羊城叉烧酥】外皮酥脆，层次很多，口感还不错，但味道一般，口味较淡。"
                                                    },
                                                    {
                                                       "comment-name":"7106470",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "Hi辣火锅",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售92元，价值100元代金券！免费WiFi！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "Hi辣火锅代金券",
                                            "item-price-line": 87,
                                            "item-old-price": 100,
                                            "item-bought": "1.0万",
                                            "item-img": "images/eshop/pic/hhgdbb44aed2e738bd4a1617e06a78b87d6277ff941.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"Hi辣火锅",
                                                 "item-detail-img": "images/eshop/pic/hhgheaddbb44aed2e738bd4a1617e06a78b87d6277ff941.jpg",
                                                 "item-detail-desc":"仅售92元，价值100元代金券！免费WiFi！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"嘉瑞宝宝团队",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"味道蛮不错，hi辣鱼和水上飘牛肉都好吃，但是一是小贵，二是厕所太小了"
                                                    },
                                                    {
                                                       "comment-name":"东旭sun",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"很好吃，我已经爱上hi辣了，最爱的还是hi辣鱼和小酥肉，其他的也一般，我爱吃 室友不爱吃，每次去还要和他商量半天，每次吃的时候多喝点酸奶，就没有那么辣了，吐血推荐hi辣鱼。。去的次数都数不清楚了，在北京去的最多家的饭馆"
                                                    },
                                                    {
                                                       "comment-name":"7106470",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "眉州东坡酒楼",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售95元，价值100元代金券！免费WiFi！！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "眉州东坡一百代金券",
                                            "item-price-line": 88,
                                            "item-old-price": 100,
                                            "item-bought": "0.5万",
                                            "item-img": "images/eshop/pic/mzdpjl0e2442a7d933c8957252efe4d41373f082020004.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"眉州东坡酒楼",
                                                 "item-detail-img": "images/eshop/pic/mzdpjlhead0e2442a7d933c8957252efe4d41373f082020004.jpg",
                                                 "item-detail-desc":"仅售95元，价值100元代金券！免费WiFi！！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"蓝精灵helen",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"这家眉州东坡是可以承办婚宴的，所以布局上多为大方桌，整整一层楼布置的宽敞明亮"
                                                    },
                                                    {
                                                       "comment-name":"东旭sun",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"再一次过来吃，服务和上菜速度相比上次提升很多，可能人不是很多的原因。这次主要想尝试一下他家的酥点，味道一般，和路边点心店水平类似。【羊城叉烧酥】外皮酥脆，层次很多，口感还不错，但味道一般，口味较淡。"
                                                    },
                                                    {
                                                       "comment-name":"ok西西2006",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的总店，好像还没有三店人多，没有排队，但是点菜太慢了，就一个服务员，麻小要的五块一个的，已经挺大了，但是做的没入味啊，完全没有麻辣的味道，wifi要扫码，但是里面的包厢手机上不去网扫不出来怎么用，建议还是换种链接方式"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "陈阿婆",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售85元，价值100元代金券！可叠加使用，提供免费WiFi，节假日通用！！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "陈阿婆100元代金券",
                                            "item-price-line": 95,
                                            "item-old-price": 100,
                                            "item-bought": "2.3万" ,
                                            "item-img": "images/eshop/pic/capc995d143ad4bd113212817715cafa40f4afb058f.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"陈阿婆",
                                                 "item-detail-img": "images/eshop/pic/capheadc995d143ad4bd113212817715cafa40f4afb058f.jpg",
                                                 "item-detail-desc":"仅售85元，价值100元代金券！可叠加使用，提供免费WiFi，节假日通用！！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"静谧摩卡",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"口味不错，就是地方太小，需要排队等位。"
                                                    },
                                                    {
                                                       "comment-name":"静谧摩卡",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"口味不错，就是地方太小，需要排队等位。"
                                                    },
                                                    {
                                                       "comment-name":"静谧摩卡",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"口味不错，就是地方太小，需要排队等位。"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "DQ冰淇淋",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售9.9元，价值15元迪利棒！节假日通用！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "DQ冰淇淋迪利棒",
                                            "item-price-line": 95,
                                            "item-old-price": 100,
                                            "item-bought": "41万",
                                            "item-img": "images/eshop/pic/DQb64543a98226cffc99b2f8ddbe014a90f703eac1.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"DQ冰淇淋",
                                                 "item-detail-img": "images/eshop/pic/DQheadb64543a98226cffc99b2f8ddbe014a90f703eac1.jpg",
                                                 "item-detail-desc":"仅售9.9元，价值15元迪利棒！节假日通用！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"huanle的123",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"还不错，就是价格略贵，不是很划算的说"
                                                    },
                                                    {
                                                       "comment-name":"huanle的123",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"还不错，就是价格略贵，不是很划算的说"
                                                    },
                                                    {
                                                       "comment-name":"huanle的123",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"还不错，就是价格略贵，不是很划算的说"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "冰城串吧",
                                    "headimg" : "images/mct-detail-page/article/mctheadimg.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售92元，价值100元代金券！免费WiFi！！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "冰城串吧100元代金券",
                                            "item-price-line": 88,
                                            "item-old-price": 100,
                                            "item-bought": "21万",
                                            "item-img": "images/eshop/pic/BCCB10dfa9ec8a136327a655972d968fa0ec08fac770.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"冰城串吧",
                                                 "item-detail-img": "images/eshop/pic/BCCBhead10dfa9ec8a136327a655972d968fa0ec08fac770.jpg",
                                                 "item-detail-desc":"仅售92元，价值100元代金券！免费WiFi！！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"杨天霸0301",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的新开路的冰城串吧 下午4点20到的 环境不错 服务员说还没开始再等10几分钟 到了4点45 服务员过来开始点餐 "
                                                    },
                                                    {
                                                       "comment-name":"杨天霸0301",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的新开路的冰城串吧 下午4点20到的 环境不错 服务员说还没开始再等10几分钟 到了4点45 服务员过来开始点餐 "
                                                    },
                                                    {
                                                       "comment-name":"杨天霸0301",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"去的新开路的冰城串吧 下午4点20到的 环境不错 服务员说还没开始再等10几分钟 到了4点45 服务员过来开始点餐 "
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              },  
              {
                                    "name" : "陈兴记生煎",
                                    "headimg" : "images/hotel-page/article/hotelimg01.jpg",
                                    "score": 4.9,
                                    "store": " ",
                                    "addr":" ",
                                    "desc": "仅售17元，价值20元代金券！可叠加使用，节假日通用！全场通用！！",
                                    "type": 0,
                                    "remai": 1,
                                    "city": "北京",
                                    "point-x":116.414557,
                                    "point-y":39.988952,
                                    "items": 
                                    [
                                        {
                                            "item-id": "1",
                                            "item-desc" : "陈兴记生煎20元代金券",
                                            "item-price-line": 17,
                                            "item-old-price": 20,
                                            "item-bought": "4.1万",
                                            "item-img": "images/eshop/pic/xjsxj962bd40735fae6cd012ffd1609b30f2442a70f29.jpg",
                                            "item-detail": {
                                                 "item-detail-name":"陈兴记生煎",
                                                 "item-detail-img": "images/eshop/pic/xjsxjhead962bd40735fae6cd012ffd1609b30f2442a70f29.jpg",
                                                 "item-detail-desc":"仅售17元，价值20元代金券！可叠加使用，节假日通用！全场通用！",
                                                 "item-detail-suibiantui": true,
                                                 "item-detail-shengyujitian": 7,
                                                 "item-detail-score": 4.1,
                                                 "item-detail-content":"",
                                                 "item-detail-commentcount": 6,
                                                 "item-detail-comment":[
                                                    {
                                                       "comment-name":"anshangdeyuer",
                                                       "comment-date":"2016-04-14",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"他们家生煎很棒，汤不好吃。凤凰汇的店面很小，主要是外卖店"
                                                    },
                                                    {
                                                       "comment-name":"anshangdeyuer",
                                                       "comment-date":"2016-03-28",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"他们家生煎很棒，汤不好吃。凤凰汇的店面很小，主要是外卖店。"
                                                    },
                                                    {
                                                       "comment-name":"anshangdeyuer",
                                                       "comment-date":"2016-01-15",
                                                       "comment-score": 4,
                                                       "comment-conetnt":"他们家生煎很棒，汤不好吃。凤凰汇的店面很小，主要是外卖店"
                                                    }
                                                 ]
                                            }
                                        }
                                    ]
              }                       
  ];

var proEntity;
var userLikeEntity;

for(var j=0;j<proArray.length;j++){
    proEntity = new proModel(proArray[j]);
    proEntity.save(function(err,doc){
      if(err) console.log(err);
      else{
          if(doc){
              if(doc.remai == 1){
                  userLikeEntity = new userLikeModel(
                    {
                        "name":doc.name,
                        "objid":doc.items[0]["_id"],
                        "preobjid":doc["_id"],
                        "desc": doc.items[0]["item-detail"]["item-detail-desc"].substring(0,16) + "......",
                        "price":doc.items[0]["item-price-line"],
                        "old-price":doc.items[0]["item-old-price"],
                        "privilege":"到店优惠",
                        "bought":"已售" + doc.items[0]["item-bought"],
                        "store":"多商圈",
                        "img": doc.items[0]["item-img"]
                     }
                  );
                  userLikeEntity.save(function(err,doc){
                           if(err) console.log("user like err");
                           else console.log("remai " + doc.name + " saved");
                  });

              }             
              console.log(doc.name + " saved");
          }
      }
    });
}  

});







