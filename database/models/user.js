const Sequelize = require('sequelize')

module.exports = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			len: [5, 20],
		},
	},
	name: Sequelize.STRING,
	passwordHash: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
}
