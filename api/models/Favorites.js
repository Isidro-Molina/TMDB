import db from '../config/db.js';
import Sequelize from 'sequelize';

class Favorite extends Sequelize.Model{ }

Favorite.init(
    {
        userId: {
            type: Sequelize.INTEGER
        },
        movieId: {
            type: Sequelize.INTEGER
        }
    },
    {
        sequelize: db,
        modelName: 'favorite',
    }
)

Favorite.addHook('beforeCreate', (favorite) => {
    return Favorite.findOne({
        where: {
            userId: favorite.userId,
            movieId: favorite.movieId
        },
    })
        .then((existing) => {
        if (existing) {
            throw new Error('Favorite already exists')
        }
    })
})

export  {Favorite}