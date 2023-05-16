const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Blogpost extends Model { }

Blogpost.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(45),
    },
    content: {
        type: DataTypes.STRING(1000),
    },
}, {
    sequelize: db,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost'
});

module.exports = Blogpost;



   