require('dotenv').config()

const { PORT } = process.env
const { TOKEN_SECRET } = process.env


module.exports = {
	PORT,
	TOKEN_SECRET,
}
