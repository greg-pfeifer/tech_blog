const { Blogpost } = require('../models')

const blogpostData =
  [
    {
      title: '',
      content: ''
    }
  ]

const seedBlogpost = () => Blogpost.bulkCreate(blogpostData)

module.exports = seedBlogpost

// Will ChatGPT Replace Developers?

// This is unlikely. Just as the invention of the calculator did not altogether replace mathematicians, ChatGPT will not entirely replace developers but will serve as a helpful tool for increased efficiency.