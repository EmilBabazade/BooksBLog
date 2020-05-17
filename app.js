const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

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
// just to test if it works or not
app.get('/teapot', async (req, res) => {
	res.status(418)
})

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

/** ******************************************************************* */

app.use(middleware.unknownEndPoint)

// error handler middlewares go below this comment,
// but i only have a very simple, 1 general error hanlder (might change in future)

app.use(middleware.errorHandler)

module.exports = app
