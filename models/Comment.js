const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Comment extends Model { }

Comment.init({
    new_comment: {
        type: DataTypes.STRING(1000),
    },
    blogpost_id:
    {
        type: DataTypes.INTEGER,
        references: {
            model: "blogpost",
            key: "id"
        }
    }
}, {
    sequelize: db,
    timestamps: true,
    freezeTableName: true,
    modelName: 'comment'
});

module.exports = Comment;



   