require('express-async-errors')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const loginRouter = express.Router()

// // user login
// loginRouter.post('/', async (req, res) => {
// 	const { body } = req

// 	const user = await User.find({ username: body.username })
// 	const passwordIsCorrect = user === null
// 		? false
// 		: await bcrypt.compare(body.password, user.passwordHash)

// 	if (user && passwordIsCorrect) {
// 		const userForToken = {
// 			username: user.username,
// 			userId: user._id,
// 		}

// 		const token = jwt.sign(userForToken, config.TOKEN_SECRET)

// 		res.status(200).json({
// 			token,
// 			username: user.username,
// 			name: user.name,
// 		})
// 	} else {
// 		res.status(400).json({
// 			error: {
// 				type: 'authorization',
// 				path: 'login',
// 				message: 'username or password is incorrect',
// 			},
// 		})
// 	}
// })

module.exports = loginRouter
