
const Blogpost = require('./Blogpost')
const Comment = require('./Comment')
const User = require('./User')


Blogpost.hasMany(Comment, {
    foreignKey: "blogpost_id", 
    onDelete: "cascade"
})

module.exports = {
    Blogpost,
    User,
    Comment
}



