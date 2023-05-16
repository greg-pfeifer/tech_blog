const router = require('express').Router();
const { Blogpost, Comment } = require('../models/index')

// GET all posts for homepage
router.get('/', async (req, res) => {
  const allBlogpost = await Blogpost.findAll({
    include: [{
      model: Comment
    }]
  })
  const blogData = allBlogpost.map(post => post.get({
    plain: true
  }))
  // console.log(blogData)
  res.render('index', {
    data: blogData,
    loggedIn: req.session.userId && true
  });
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
    return;
  }
  res.render('auth/login');
});

// Register route
router.get('/register', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
    return;
  }
  res.render('auth/register');
});

module.exports = router;