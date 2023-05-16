const router = require('express').Router()
const { User, Blogpost, Comment } = require('../../models')

function isAuthenticated(req, res, next) {
  console.log(req.session.userId)
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId
    },
    include: Blogpost,
    attributes: {
      exclude: ['password']
    }
  });

  res.render('private/dashboard', {
    user,
    loggedIn: true,
    isDashboard: true
  });
});

// BLOGPOST ROUTES

router.get('/newpost', isAuthenticated, async (req, res) => {
  res.render('private/newpost', {
    loggedIn: true
  });
});

router.post('/newpost', isAuthenticated, (req, res) => {
  Blogpost.create({
    title: req.body.title,
    content: req.body.content
  }).then (res.redirect('/'))
});

router.put('/updatepost/:id', isAuthenticated, (req, res) => {
  console.log('update triggered')
  Blogpost.update(
    req.body,
  {
    where: {
      id: req.params.id
    }
  }
  ).then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err))
})

router.delete('/deletepost/:id', isAuthenticated, (req, res) => {
  Blogpost.destroy(
    {
      where: {
        id: req.params.id
      }
  }).then (res.redirect('/'))
})
 
// Get update post
router.get('/updatepost/:id', isAuthenticated, async (req, res) => {

  const blogpost = await Blogpost.findByPk(req.params.id)
  const postData = blogpost.get({
    plain: true
  })
  console.log(postData)
  res.render('private/updatepost', {
    postData, 
    loggedIn: true,
    // blogpost_id: req.params.blogpost_id
    
  })
});

// Comment routes
router.get('/newcomment', isAuthenticated, async (req, res) => {
  res.render('private/newcomment', {
    loggedIn: true,
    blogpost_id: req.params.blogpost_id
  });
});

router.post('/newcomment', isAuthenticated, (req, res) => {
  Comment.create({
    blogpost_id: req.body.blogpost_id,
    new_comment: req.body.new_comment
  }).then (res.redirect('/'))
    console.log(this)
});


module.exports = router

// PAUL
// Comment routes
// router.get('/newcomment/:blogpost_id', isAuthenticated, async (req, res) => {
//   res.render('private/newcomment', {
//     loggedIn: true,
//     blogpost_id: req.params.blogpost_id
//   });
// });