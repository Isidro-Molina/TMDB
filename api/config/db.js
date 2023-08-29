import Sequelize from 'sequelize';

const db = new Sequelize('tmdb', null, null, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export default db