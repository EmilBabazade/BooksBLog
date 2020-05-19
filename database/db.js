const Sequelize = require('sequelize')
const User = require('./models/user')
const Blog = require('./models/blog')
const logger = require('../utils/logger')
const dbConfigs = require('./config')

let sequelize
if (process.env.NODE_ENV === 'production') {
	sequelize = new Sequelize(dbConfigs.production)
} else if (process.env.NODE_ENV === 'development') {
	sequelize = new Sequelize(dbConfigs.development)
} else if (process.env.NODE_ENV === 'test') {
	sequelize = new Sequelize(dbConfigs.test)
} else {
	logger.error('error when connecting to db, invalid or empty NODE_ENV')
	// throw something ..?
}

const userModel = sequelize.define('user', User)
const blogModel = sequelize.define('blog', Blog)
userModel.hasMany(blogModel)
blogModel.belongsTo(userModel)

module.exports = {
	sequelize,
	User: userModel,
	Blog: blogModel,
}
