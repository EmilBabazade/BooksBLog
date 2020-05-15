require('express-async-errors')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

// get all the users
userRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users.map((user) => user.toJSON()))
})

// create users

// delete users, only admin user can do this

module.exports = userRouter
