var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
   res.render('accountinfo');
});


router.get('/logout',function(req,res,next){
	res.clearCookie('account');
	console.log('clear cookie');
    res.redirect('/eshop/login');
});

module.exports = router;