const Sequelize = require('sequelize')

module.exports = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: Sequelize.STRING,
		AllowNull: false,
		validate: {
			len: [5, 20],
		},
	},
	content: {
		type: Sequelize.STRING,
		AllowNull: false,
		validate: {
			len: [20, 500],
		},
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
	},
}
