require('express-async-errors')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const userRouter = express.Router()

// get all the users
// userRouter.get('/', async (req, res) => {
// 	const users = await User.findAll({
// 		attributes: ['id', 'username', 'name'],
// 	})
// 	res.json(users.toJSON())
// })

// // create users
// userRouter.post('/', async (req, res) => {
// 	const { body } = req
// 	// check password
// 	if (body.password.length < 8) {
// 		return res.status(400).json({
// 			// here it would be better to throw new mongoose.Error.ValidationError
// 			// but i couldn't bother with it
// 			error: {
// 				type: 'minlength',
// 				path: 'password',
// 				message: 'password needs to be at least 8 characters long',
// 			},
// 		})
// 	}

// 	// hash the password
// 	const passwordHash = await bcrypt.hash(body.password, 10)

// 	const user = new User({
// 		username: body.username,
// 		name: body.name,
// 		isAdmin: body.isAdmin,
// 		passwordHash,
// 	})

// 	const savedUser = await user.save()
// 	res.status(201).json(savedUser.toJSON())
// })

// delete users, only admin user can do this


module.exports = userRouter
