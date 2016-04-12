
define(['verify','ajax','jquery'],function(verify,ajax,$){
  return{
    deal_login_main:function(){

          var error = document.getElementById('error');
          var inputtel = document.getElementById('inputtel');
          var inputyzm = document.getElementById('inputyzm');
          var smssubmit = document.getElementsByClassName('sms-submit')[0];
          var passbuttonauto = document.getElementsByClassName('pass-button-auto')[0];


          var isinputtelok = false;
          var isinputyzm = false;

          smssubmit.disabled = true;

          inputtel.onfocus = function(){
              if(this.value == this.getAttribute('placeholder')){
                 this.value = '';
              }
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
              .done(function(msg) {
                           if(!msg.isok){
                               error.innerHTML = msg.errmsg;
                               isinputtelok = false;
                           }else{
                               error.innerHTML = '';          
                           }
              })
              .fail(function() {
                console.log("error");
              })
              .always(function() {
                console.log("complete");
              });
          }
            }
      
            if(isinputtelok && isinputyzm){
               smssubmit.style.backgroundColor = '#488ee7';
               smssubmit.disabled = false;
            }else{
               smssubmit.style.backgroundColor = '#a4c7f3';
               smssubmit.disabled = true;             
            } 
          };


          inputyzm.onfocus = function(){
            if(this.value == this.getAttribute('placeholder')){
              this.value = '';
            }
          };

          inputyzm.oninput = function(){
             if(isinputtelok){
               smssubmit.style.backgroundColor = '#488ee7';
               smssubmit.disabled = false;
             }
          };

          inputyzm.onblur = function(){
            isinputyzm = true;
            if(!this.value){
               isinputyzm = false;
            }


            if(isinputtelok && isinputyzm){
               smssubmit.style.backgroundColor = '#488ee7';
               smssubmit.disabled = false;
            }else{
               smssubmit.style.backgroundColor = '#a4c7f3';
               smssubmit.disabled = true;             
            }  
          };

      passbuttonauto.onclick=function(){ verify.getyzm(this); };  
    }
  };
});