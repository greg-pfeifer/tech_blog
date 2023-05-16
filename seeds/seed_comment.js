const { Comment } = require('../models')

const commentData =
  [
    {
      title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque veritatis eum odit minima, animi, quod quaerat ut rem recusandae, rerum maiores iusto quos nulla at sed illo debitis est.'
    }
  ]

const seedComment = () => Comment.bulkCreate(commentData)

module.exports = seedComment