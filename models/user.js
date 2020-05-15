const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minlength: 5,
	},
	name: String,
	passwordHash: String,
	isAdmin: {
		type: Boolean,
		required: true,
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog_blog',
		},
	],
})

userSchema.set('toJSON', {
	transform: ((document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		// don't return password
		delete returnedObject.passwordHash
	}),
})

userSchema.plugin(uniqueValidator)

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('User_blog', userSchema)
