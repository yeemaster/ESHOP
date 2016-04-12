define(['verify','ajax','jquery'],function(verify,ajax,$){

  return{
     deal_register_main:function(){
      var error = document.getElementById('error');
      var inputtel = document.getElementById('inputtel');
      var inputusername = document.getElementById('inputusername');
      var inputpwd = document.getElementById('inputpwd');
      var inputyzm = document.getElementById('inputyzm');

      var smssubmit = document.getElementsByClassName('sms-submit')[0];
      var passbuttonauto = document.getElementsByClassName('pass-button-auto')[0];


      var isinputtelok = false;
      var isinputusername = false;
      var isinputpwd = false;
      var isputyzm = false;

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
                      url: '/register/verifytel',
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

        if(isinputtelok && isinputusername && isinputpwd && isputyzm){
           smssubmit.style.backgroundColor = '#488ee7';
           smssubmit.disabled = false;
        }else{
           smssubmit.style.backgroundColor = '#a4c7f3';
           smssubmit.disabled = true;             
        } 
      };


      inputusername.onfocus = function(){
          if(this.value == this.getAttribute('placeholder')){
             this.value = '';
          }
      };

      inputusername.onblur = function(){
        isinputusername = true;
        var username = this.value;

        if(this.value === ''){
          isinputusername = false;
        }else{
            if(!(/^[a-zA-Z\d]\w{2,14}[a-zA-Z\d]$/i.test(this.value)))
            {
                error.innerHTML = ' ! 用户名格式不正确';
                isinputusername = false;
            }else{
                $.ajax({
                  url: '/register/verifyuser',
                  type: 'POST',
                  dataType: 'json',
                  data: {'username' : username}
                })
                .done(function(msg) {
                             if(!msg.isok){
                                 error.innerHTML = msg.errmsg;
                                 isinputusername = false;
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
  
        if(isinputtelok && isinputusername && isinputpwd && isputyzm){
           smssubmit.style.backgroundColor = '#488ee7';
           smssubmit.disabled = false;
        }else{
           smssubmit.style.backgroundColor = '#a4c7f3';
           smssubmit.disabled = true;             
        } 
      };



      inputpwd.onfocus = function(){
        if(this.value == this.getAttribute('placeholder')){
          this.value = '';
        }
      };

      inputpwd.onblur = function(){
        isinputpwd = true;
        if(!this.value){
           isinputpwd = false;
        }

        if(isinputtelok && isinputusername && isinputpwd && isputyzm){
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
         if(isinputtelok && isinputusername){
           smssubmit.style.backgroundColor = '#488ee7';
           smssubmit.disabled = false;
         }
      };

      inputyzm.onblur = function(){
        isputyzm = true;
        if(!this.value){
           isputyzm = false;
        }


       if(isinputtelok && isinputusername && isinputpwd && isputyzm){
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
