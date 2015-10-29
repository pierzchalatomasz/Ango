var User = require('../../modules/users.js');
var passport = require('passport');
var PostController = require('../../modules/post-controller');

module.exports = function(router) {

  /* GET admin page. */
  router.get('/', function(req, res, next) {
    PostController.getPostsFromDB(function() {
      if(req.isAuthenticated())
        res.render('./admin/index', { isAuthenticated: req.isAuthenticated(), user: req.user });
      else res.redirect('login');
    });
  });

  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
  });

  router.get('/login', function(req, res) {
    res.render('admin/login');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/admin');
  });

  router.get('/register', function(req, res) {
    res.render('admin/register');
  });

  router.post('/register', function(req, res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    newUser.save(function(err) {
      if(err) throw err;
    })
    res.redirect('/admin/login');
  });

}
