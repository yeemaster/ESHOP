var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
   if(req.query.username)
      res.render('userhome',{'username':req.query.username,'usertel':req.query.usertel});
   else
   	  res.render('userhome');
});


module.exports = router;