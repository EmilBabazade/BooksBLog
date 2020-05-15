const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helpers/users')
const app = require('../app')

const api = supertest(app)

// initialize db before all
beforeEach(async () => {
	await User.deleteMany({})

	const users = helper.initialUsers.map((user) => new User(user))
	const promisArr = users.map((user) => user.save())

	await Promise.all(promisArr)
})

describe('many user tests', () => {
	test('get returns json', async () => {
		await api
			.get('/api/users/')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('get returns correct length', async () => {
		const results = await api
			.get('/api/users/')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const users = results.body
		expect(users).toHaveLength(helper.initialUsers.length)
	})
})

// close connection after all
afterAll(() => {
	mongoose.connection.close()
})
