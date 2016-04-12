  var crypto = require('crypto');
  var count = 15;


  function hashOperate(obj1,obj2){
    var hash =crypto.createHash('md5');
    hash.update(obj1+obj2);
    return hash.digest('hex');
  }

  function checkClose(){
    count = count -1;

    if(count == 0) {
       mongoose.disconnect();
       console.log('db close');
    }
  }


  //引入
  var mongoose = require('mongoose');
  //创建链接
  var db = mongoose.createConnection('mongodb://127.0.0.1:27017/eshop');
  //测试
  db.on('error',console.error.bind(console,'connection error'));

  //打开
  db.once('open',function(){

  console.log('mongoose opened!');
 
  //Schema 
  var userSchema = new mongoose.Schema({
      username:{type:String,unique:true},
      usertel:{type:String,unique:true},
      hashpwd:{type:String},
      hashyzm:{type:String},
      lastlogintime:{type:String}
  });

  //实体
  var userModel = db.model('col_accounts',userSchema);

  //
  var userEntity = new userModel({
    username:'admin',usertel:'18046040955',hashpwd:hashOperate('admin','111111'),hashyzm:hashOperate('18046040955','111111'),lastlogintime:''
   }
  );

  userEntity.save(function(err,doc){
    if(err) console.log(err);
    else console.log(userEntity.username + ' saved');
    checkClose();
  });

  userEntity = new userModel({
    username:'yequan',usertel:'18046521243',hashpwd:hashOperate('yequan','222222'),hashyzm:hashOperate('18046521243','222222'),lastlogintime:''
  });

  userEntity.save(function(err,doc){
    if(err) console.log(err);
    else console.log(userEntity.username + 'saved');
    checkClose();
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
            "item-bought": {type:Number},
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
  var proModel = db.model('col_proitems',proSchema);

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
                    "item-bought": 2094,
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
                    "item-bought": 67,
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
                    "item-bought": 828,
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
                    "item-bought": 559,
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
                    "item-bought": 2094,
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
                    "item-bought": 67,
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
        }
  ];



var proEntity;

for(var j=0;j<proArray.length;j++){
    proEntity = new proModel(proArray[j]);
    proEntity.save(function(err,doc){
      if(err) console.log(err);
      else console.log(proEntity.name + ' saved');
      checkClose();
    });
}  


var userLikeSchema = new mongoose.Schema(
  {
    "name":{type:String},
    "objid":{type:String,unique:true},
    "img":{type:String},
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
var userLikeModel = db.model('col_userlikes',userLikeSchema);

//
var userLikeArray = [
    {
      "name":"好伦哥",
      "objid":" ",
      "img":"images/index-page/article/good01.jpg",
      "desc":"单人自助餐！好伦哥北京15店+吉姆斯自...",
      "price":52,
      "old-price":56,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"呷哺呷哺",
      "objid":" ",
      "img":"images/index-page/article/good02.jpg",
      "desc":"暖春番茄肥牛套餐！节假日通用！提供免费...",
      "price":22,
      "old-price":46,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"芦月轩羊蝎子",
      "objid":" ",
      "img":"images/index-page/article/good03.jpg",
      "desc":"100元代金券！节假日通用，可叠加，全...",
      "price":77,
      "old-price":100,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"眉州东坡酒楼",
      "objid":" ",
      "img":"images/index-page/article/good04.jpg",
      "desc":"100元代金券！可叠加使用，节假日通用...",
      "price":85,
      "old-price":100,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"金鼎轩",
      "objid":" ",
      "img":"images/index-page/article/good05.jpg",
      "desc":"100元代金券！可叠加使用！时间在这里...",
      "price":87,
      "old-price":100,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"玫瑰花园",
      "objid":" ",
      "img":"images/index-page/article/good01.jpg",
      "desc":"龙翔路店单人自助！可叠加使用！",
      "price":63,
      "old-price":79,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"北太平庄",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"永远爱自助烤肉火锅",
      "objid":" ",
      "img":"images/index-page/article/good02.jpg",
      "desc":"【推荐】单人自助晚餐！节假日通用！提供...",
      "price":56,
      "old-price":69,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"天通苑",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"鑫海汇海鲜烤肉自助",
      "objid":" ",
      "img":"images/index-page/article/good03.jpg",
      "desc":"慈云寺店单人自助晚餐！节假日通用，提供...",
      "price":53,
      "old-price":79,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"多商圈",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"川骄海鲜自助火锅",
      "objid":" ",
      "img":"images/index-page/article/good04.jpg",
      "desc":"单人自助！提供免费WiFi！",
      "price":290,
      "old-price":320,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"北京站",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    },
    {
      "name":"伊尔克啤酒烤肉",
      "objid":" ",
      "img":"images/index-page/article/good05.jpg",
      "desc":"单人自助！节假日通用，提供免费WiFi...",
      "price":54,
      "old-price":69,
      "privilege":"立减6元",
      "bought":"已售21.0万",
      "store":"黄村",
      "img": "images/home-detail-page/article/recom-carouos01.jpg"
    }            
];

var userLikeEntity;

for(var j=0;j<userLikeArray.length;j++){
     userLikeEntity = new userLikeModel(userLikeArray[j]);
     userLikeEntity.save(function(err,doc){
         if(err) console.log("user like err");
         else console.log("user like ok");
         checkClose();
     });
}














































});







