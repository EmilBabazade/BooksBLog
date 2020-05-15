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

describe('creating a user', () => {
	test('valid username and password works', async () => {
		const user = {
			username: 'emil144',
			name: 'emil',
			password: 'emil2000',
			isAdmin: false,
		}

		await api
			.post('/api/users/')
			.expect(201)
			.expect('Content-Type', /application\/json/)

		// correct number of users in db
		const users = await helper.usersInDb()
		expect(users).toHaveLength(helper.initialUsers.length + 1)

		// user in the db
		const usernames = users.map((u) => u.username)
		expect(usernames).toContain(user.username)
	})

	test('if username length less than 8 return correct status code and error',
		async () => {
			const user = {
				username: 'ad',
				name: 'sfs',
				password: 'sfsfefdssa',
				isAdmin: false,
			}

			const result = await api
				.post('/api/users/')
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const { error } = result.body
			expect(error.type).toBe('minlength')
			expect(error.path).toBe('username')
		})

	test('if password length less than 5 return correct status code and error',
		async () => {
			const user = {
				username: 'addsw',
				name: 'sfs',
				password: 'eds',
				isAdmin: false,
			}

			const result = await api
				.post('/api/users/')
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const { error } = result.body
			expect(error.type).toBe('minlength')
			expect(error.path).toBe('password')
		})

	test('if user with username already exist then return correct status code and error',
		async () => {
			const user = {
				username: 'tomhas',
				name: 'sfs',
				password: 'edss',
				isAdmin: false,
			}

			const result = await api
				.post('/api/users/')
				.expect(400)
				.expect('Content-Type', /application\/json/)

			const { error } = result.body
			expect(error.type).toBe('unique')
			expect(error.path).toBe('username')
		})
})

// close connection after all
afterAll(() => {
	mongoose.connection.close()
})
