const supertest = require('supertest')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helpers/users')
const app = require('../app')

const api = supertest(app)

// initialize db before all
beforeEach(async () => {
	await User.destroy({ where: {}, force: true })
	await Blog.destroy({ where: {}, force: true })

	// create initial users
	const promiseArr = helper.initialUsers.map((user) => User.create(user))
	await Promise.all(promiseArr)
})

describe('many user tests', () => {
	test('get returns json', async () => {
		await api
			.get('/api/users/')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	// test('get returns correct length', async () => {
	// 	const results = await api
	// 		.get('/api/users/')
	// 		.expect(200)
	// 		.expect('Content-Type', /application\/json/)

	// 	const users = results.body
	// 	expect(users).toHaveLength(helper.initialUsers.length)
	// })
})

// describe('creating a user', () => {
// 	test('valid username and password works', async () => {
// 		const user = {
// 			username: 'emil144',
// 			name: 'emil',
// 			password: 'emil2000',
// 			isAdmin: false,
// 		}

// 		await api
// 			.post('/api/users/')
// 			.send(user)
// 			.expect(201)
// 			.expect('Content-Type', /application\/json/)

// 		// correct number of users in db
// 		const users = await helper.usersInDb()
// 		expect(users).toHaveLength(helper.initialUsers.length + 1)

// 		// user in the db
// 		const usernames = users.map((u) => u.username)
// 		expect(usernames).toContain(user.username)
// 	})

// 	test('if username length less than 8 return correct status code and error',
// 		async () => {
// 			const user = {
// 				username: 'ad',
// 				name: 'sfs',
// 				password: 'sfsfefdssa',
// 				isAdmin: false,
// 			}

// 			const result = await api
// 				.post('/api/users/')
// 				.send(user)
// 				.expect(400)
// 				.expect('Content-Type', /application\/json/)

// 			const { error } = result.body
// 			expect(error.path).toBe('username')
// 			expect(error.type).toBe('minlength')
// 		})

// 	test('if password length less than 5 return correct status code and error',
// 		async () => {
// 			const user = {
// 				username: 'addsw',
// 				name: 'sfs',
// 				password: 'eds',
// 				isAdmin: false,
// 			}

// 			const result = await api
// 				.post('/api/users/')
// 				.send(user)
// 				.expect(400)
// 				.expect('Content-Type', /application\/json/)

// 			const { error } = result.body
// 			expect(error.path).toBe('password')
// 			expect(error.type).toBe('minlength')
// 		})

// 	test('if user with username already exist then return correct status code and error',
// 		async () => {
// 			const user = {
// 				username: 'tomhas',
// 				name: 'sfs',
// 				password: 'edsseffef',
// 				isAdmin: false,
// 			}

// 			const result = await api
// 				.post('/api/users/')
// 				.send(user)
// 				.expect(400)
// 				.expect('Content-Type', /application\/json/)

// 			const { error } = result.body
// 			expect(error.path).toBe('username')
// 			expect(error.type).toBe('unique')
// 		})
// })

// describe('User login', () => {
// 	describe('correct username and password logs in and returns 200', async () => {

// 	})

// 	describe('incorrect username returns 400 and correct error', async () => {})

// 	describe('incorrect password returns 400 and correct error', async () => {})
// })

// implement after login

// describe('User deletion', () => {
// 	test('returns status 204 with valid parameters', async () => {})

// 	test('returns 404 when user to be deleted don\'t exist', async () => {

// 	})

// 	test('returns 401 when user deletING is not admin', async () => {

// 	})
// })

// close connection after all
// afterAll(async () => {
// 	await global.db.close()
// })
