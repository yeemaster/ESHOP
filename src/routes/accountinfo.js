var express = require('express');
var router = express.Router();
var myglobal = require('../models/myglobal');

router.get('/',function(req,res,next){
   res.render('accountinfo');
});


router.get('/logout',function(req,res,next){
	res.clearCookie('account');
	console.log('clear cookie');
    res.redirect(myglobal.net + '/login');
});

module.exports = router;