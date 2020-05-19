const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const logger = require('./utils/logger')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const db = require('./database/db')

const app = express()

// if u do sequelize.sync({force: true}),
// existing tables will be dropped from the db, so
// doing this before each test will make db empty out, that is why
// only sync when its not test and sync with force when it is test
if (process.env.NODE_ENV !== 'test') {
	db.sequelize.sync().then(async () => {}).catch(console.error)
}

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
