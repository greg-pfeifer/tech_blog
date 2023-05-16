const router = require('express').Router();
const User = require('../../models/User');

function isLoggedIn (req, res, next) {
    if (req.session.user_id) return res.redirect('/dashboard');
    next();
  }

// CREATE new user - endpoint: auth/register
router.post('/register', isLoggedIn, async (req, res) => {
    const formData = req.body;
    try {
      const userData = await User.create({
        username: formData.username,
        password: formData.password,
      });
      req.session.userId = userData.id;
      return res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  });

  // Login
router.post('/login', isLoggedIn, async (req, res) => {
  const formData = req.body;

  try {
    const user = await User.findOne({
      where: {
        username: formData.username,
      },
    });

    if (!user) {
      return res.redirect('/register');
    }

    const validPassword = await user.checkPassword(formData.password);

    if (!validPassword) {
      return res.redirect('/login')
    }

    req.session.userId = user.id;

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
  
  module.exports = router