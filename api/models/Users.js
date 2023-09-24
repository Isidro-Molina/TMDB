import db from '../config/db.js'
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt'

class User extends Sequelize.Model {
    hash(password, salt) {
        return bcrypt.hash(password, salt);
    }

    validatePassword(password) {
        return bcrypt.hash(password, this.salt).then((hash) => hash === this.password);
    }
}

User.init(
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        salt: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'user',
    }
);

User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync();
    user.salt = salt;

    return user.hash(user.password, salt).then((hash) => {
        user.password = hash;
    });
});


export {User}
