const logger = require('./logger')

// put your middleware functions here
const errorHandler = (err, req, res, next) => {
	logger.error(err)

	// you can customize ValidationError error messages
	// here by checking kind and path of error
	// and then just put a custom message in error.message
	if (err.name === 'ValidationError') {
		res.status(400).json({
			error: {
				type: err.kind,
				path: err.path,
				message: err.message,
			},
		})
	}

	next(err)
}

const unknownEndPoint = (req, res) => {
	res.status(404).json({
		error: 'unknown endpoint',
	})
}
module.exports = {
	errorHandler,
	unknownEndPoint,
}
