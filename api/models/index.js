import { Favorite } from './Favorites.js';
import { User } from './Users.js';

Favorite.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
User.hasMany(Favorite, {foreignKey: 'userId'})

export {User, Favorite}