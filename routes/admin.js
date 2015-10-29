var express = require('express');
var router = express.Router();

// Login
var loginRouter = require('./admin-modules/login-router')(router);

// Posts
var postsRouter = require('./admin-modules/posts-router')(router);

// Images
var imagesRouter = require('./admin-modules/images-router')(router);

module.exports = router;
