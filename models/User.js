const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const bcrypt = require('bcrypt');
const Blogpost = require('./Blogpost');

class User extends Model {
    async checkPassword(provided_password) {
        const is_valid = await bcrypt.compare(provided_password, this.password);
        return is_valid;
    }
}

User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: 8,
                msg: 'Your password must include at least 8 characters'
            }
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            const encrypted_pass = await bcrypt.hash(user.password, 10);

            user.password = encrypted_pass;
        }
    }
});

User.hasMany(Blogpost);
Blogpost.belongsTo(User);

module.exports = User