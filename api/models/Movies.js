const S = require('sequelize')
const db = require('../config/db')

class Movie extends S.Model{ }

Movie.init(
    {
        name: {
            type: S.STRING,
            allowNull: false
        },
        imageURL: {
            type: S.STRING
        },
        overview: {
            type: S.TEXT
        },
        releaseDate: {
            type: S.DATE
        },
        rating: {
            type: S.INTEGER
        }
        
    },
    {sequelize: db, modelName: 'movie'}
)

module.exports = Movie