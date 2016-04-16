define(['verify','ajax','jquery'],function(verify,ajax,$){

  return{
     deal_register_main:function(){
      var error = document.getElementById('error');
      var inputtel = document.getElementById('inputtel');
      var inputusername = document.getElementById('inputusername');
      var inputpwd = document.getElementById('inputpwd');
      var reinputpwd = document.getElementById('reinputpwd');
      var inputyzm = document.getElementById('inputyzm');
      var smssubmit = document.getElementsByClassName('sms-submit')[0];
      var passbuttonauto = document.getElementsByClassName('pass-button-auto')[0];

      var isinputtelok = false;
      var isinputusername = false;
      var isinputpwd = false;
      var isputyzm = false;
      smssubmit.disabled = true;

      var timer = setInterval(function(){
          verifyInputResult();
      },500);

      inputtel.onfocus = function(){
        isinputtelok = false;
        startInterval();
      };
      inputusername.onfocus = function(){
        isinputusername = false;
        startInterval();
      };
      inputpwd.onfocus = function(){
        isinputpwd = false;
        startInterval();
      };
      reinputpwd.onfocus = function(){
        isinputpwd = false;
        startInterval();
      };
      inputyzm.onfocus = function(){
        startInterval();
      };      

      inputtel.onblur = function(){
        isinputtelok = true;
        var telno = this.value;

        if(this.value === ''){
          isinputtelok = false;
        }else{
            if(!(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(this.value)))
            {
                error.innerHTML = ' ! 手机格式不正确';
                isinputtelok = false;
            }else{
                    $.ajax({
                      url: 'http://yequan.ren/eshop/register/verifytel',
                      type: 'POST',
                      dataType: 'json',
                      data: {'telNo' : telno}
                    })
                    .success(function(msg) {
                                 if(!msg.isok){
                                     error.innerHTML = msg.errmsg;//手机不符合
                                     isinputtelok = false;
                                 }else{
                                     error.innerHTML = '';          
                                 }
                    })
                    .error(function() {
                      console.log("error");
                    })
                    .complete(function() {
                      console.log("complete");
                    });                  
            }
        }
      };

      inputusername.onblur = function(){
        isinputusername = true;
        var username = this.value;

        if(this.value === ''){
          isinputusername = false;
        }else{
            if(!(/^[a-zA-z][a-zA-Z0-9_]{2,9}$/i.test(this.value)))
            {
                error.innerHTML = ' ! 用户名由3-10位的字母下划线和数字组成，不能以数字或下划线开头';
                isinputusername = false;
            }else{
                $.ajax({
                  url: 'http://yequan.ren/eshop/register/verifyuser',
                  type: 'POST',
                  dataType: 'json',
                  data: {'username' : username}
                })
                .success(function(msg) {
                             if(!msg.isok){
                                 error.innerHTML = msg.errmsg;
                                 isinputusername = false;
                             }else{
                                 error.innerHTML = '';          
                             }
                })
                .error(function() {
                  console.log("error");
                })
                .complete(function() {
                  console.log("complete");
                });
            }
        }
      };

      inputpwd.onblur = function(){
        if(!this.value){
           isinputpwd = false;
        }else if(this.value.length < 6 || this.value.length > 14){
           isinputpwd = false;
           error.innerHTML = "密码长度不符合格式要求！";
        }else if(reinputpwd.value){
           reinputpwd.onblur();
        }
      };


      reinputpwd.onblur = function(){
        isinputpwd = true;
        if(!this.value){
           isinputpwd = false;
        }else if(this.value != inputpwd.value){
            error.innerHTML = '两次输入密码不一至';
            isinputpwd = false;
        }
      };
     

      inputyzm.oninput = function(){
        isputyzm = true;
        if(!this.value){
           isputyzm = false;
        }
      };

      inputyzm.onblur = function(){
        isputyzm = true;
        if(!this.value){
           isputyzm = false;  
        } 
      };


      smssubmit.onclick = function(e){
          e.preventDefault();
          //禁用
          smssubmit.disabled = true;
          isinputtelok.disabled = true;
          isinputusername.disabled = true;


          var formdata = {
             'inputtel':inputtel.value,
             'inputusername':inputusername.value,
             'inputpwd':inputpwd.value,
             'inputyzm':inputyzm.value
          };

          $.ajax({
            url: 'http://yequan.ren/eshop/register',
            type: 'POST',
            dataType: 'json',
            async:false,
            data: formdata
          })
          .success(function(msg) {
               if(msg.isok){
                   error.innerHTML = msg.errmsg;
                   verify.gettiaozhuan(error);
                   setTimeout(function(){
                        window.location.href = "http://yequan.ren/eshop/login";
                   },3000);
               }else{
                   error.innerHTML = '';          
               }
          })
          .error(function(e) {
            console.log("error");
          })
          .complete(function() {
            console.log("complete");
          });          
          //开启
          isinputtelok.disabled = false;
          isinputusername.disabled = false;
      };

       function verifyInputResult(){
          if(isinputtelok && isinputusername && isinputpwd && isputyzm){
             smssubmit.style.backgroundColor = '#488ee7';
             smssubmit.disabled = false;
             clearInterval(timer);
             timer = null;
          }else{
             smssubmit.style.backgroundColor = '#a4c7f3';
             smssubmit.disabled = true;              
          }          
       }

       function startInterval(){
          if(!timer){
              timer = setInterval(function(){
                  verifyInputResult();
              },500);
          }
       }

       passbuttonauto.onclick=function(){ verify.getyzm(this); };  
     }//deal_register_main
  };
});
