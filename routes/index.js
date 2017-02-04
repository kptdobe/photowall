var myconf = require('../myconf').myconf;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    console.log('Incoming request from client ' + ip);
  res.render('images', {
      duration: myconf.get('app:slideshow:items:duration'),
      images: global.images
  });
});

module.exports = router;
