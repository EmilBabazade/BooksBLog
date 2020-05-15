const logger = require('../../utils/logger')
const User = require('../../models/user')

const initialUsers = [
	{
		username: 'admin',
		name: 'admin',
		password: 'admin1234',
		isAdmin: true,
	},
	{
		username: 'tomhas',
		name: 'tom',
		password: 'tom1234',
		isAdmin: false,
	},
]

const usersInDb = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}

module.exports = {
	initialUsers,
	usersInDb,
}
