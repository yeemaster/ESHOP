
define(['verify','ajax','jquery'],function(verify,ajax,$){
  return{
    deal_login_main:function(){

          var error = document.getElementById('error');
          var inputtel = document.getElementById('inputtel');
          var inputyzm = document.getElementById('inputyzm');
          var smssubmit = document.getElementsByClassName('sms-submit')[0];
          var passbuttonauto = document.getElementsByClassName('pass-button-auto')[0];
          var form = document.getElementsByTagName('form')[0];

          var isinputtelok = false;
          var isinputyzm = false;
          smssubmit.disabled = true;


          var timer = setInterval(function(){
              verifyInputResult();
          },500);

          inputtel.onfocus = function(){
              isinputtelok = false;
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
                        url: 'http://yequan.ren/eshop/login/verifytel',
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


          inputyzm.oninput = function(){
            isinputyzm = true;
            if(!this.value){
               isinputyzm = false;
            }
          };

          inputyzm.onblur = function(){
            isinputyzm = true;
            if(!this.value){
               isinputyzm = false;
            }
          };


           function verifyInputResult(){
              if(isinputtelok && isinputyzm){
                 smssubmit.style.backgroundColor = '#488ee7';
                 smssubmit.disabled = false;
                 clearInterval(timer);
                 timer = null;                 
              }else{
                 smssubmit.style.backgroundColor = '#a4c7f3';
                 smssubmit.disabled = true;             
              }  
           }

          smssubmit.onclick = function(e){
              e.preventDefault();
              //禁用
              smssubmit.disabled = true;
              inputtel.disabled = true;



              var formdata = {
                 'inputtel':inputtel.value,
                 'inputyzm':inputyzm.value
              };

              $.ajax({
                url: 'http://yequan.ren/eshop/login/isgouserhome',
                type: 'POST',
                dataType: 'json',
                async:false,
                data: formdata
              })
              .success(function(msg) {
                   if(!msg.isok){
                       error.innerHTML = msg.errmsg;        
                   }
                   else{
                      //开启才能submit
                      inputtel.disabled = false;                    
                      form.submit();
                   }
              })
              .error(function(e) {
                console.log("error");
              })
              .complete(function() {
                console.log("complete");
              });          
              //开启
              inputtel.disabled = false;
          }; 

           function startInterval(){
              if(!timer){
                  timer = setInterval(function(){
                      verifyInputResult();
                  },500);
              }
           }
          
          passbuttonauto.onclick=function(){ verify.getyzm(this); };  
    }
  };
});