const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
// const middleware = require('./utils/middleware') no middleware to use yet

const app = express()

// since mongo only allows 1 free cluster and i am as cheap as one can be
// name the modules starting with blog_
// and of course we use the same for testing since i am probably not
// going touch this again after i launch it
logger.info(`connecting to DB at ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		logger.info('connected to mongodb!')
	})
	.catch((error) => {
		logger.error(`error when connecting to db: ${error}`)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

/** *******import your controllers here as express router object******* */
// just to test if it works or not, will delete later
app.get('/', async (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html',
	})
	res.write('<!doctype html>\n<html lang="en">\n'
        + '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n'
        + '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n'
        + '\n\n<h1>Euro 2012 teams</h1>\n'
        + '<div id="content"><p>The teams in Group D for Euro 2012 are:</p><ul><li>England</li><li>France</li><li>Sweden</li><li>Ukraine</li></ul></div>'
        + '\n\n')
	res.end()
})

app.use('/api/users', userRouter)

/** ******************************************************************* */

module.exports = app
