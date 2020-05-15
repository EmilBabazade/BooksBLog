const logger = require('../../utils/logger')
const User = require('../../models/user')

const initialUsers = [
	{
		username: 'root',
		name: 'admin',
		password: 'admin1234',
		isAdmin: true,
		blogs: [],
	},
	{
		username: 'tomhas',
		name: 'tom',
		password: 'tom1234',
		isAdmin: false,
		blogs: [],
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
