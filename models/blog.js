const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		minglength: 5,
		required: true,
	},
	content: {
		type: String,
		minlength: 20,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		returnedObject.date = returnedObject.date.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog_blog', blogSchema)
