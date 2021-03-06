require('dotenv').config()

let { MONGODB_URI } = process.env
const { PORT } = process.env
const { TOKEN_SECRET } = process.env

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
	MONGODB_URI,
	PORT,
	TOKEN_SECRET,
}
