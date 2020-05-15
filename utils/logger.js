// if you need to use somekind of custom logger or some logger module put it here

// during tests errors will be thrown on purpose and its annoying
// having the terminal full of error messages
// if u need to log something during tests just console.log()
// but don't forget to delete them after u done with testing

const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params)
	}
}

module.exports = {
	info,
	error,
}
