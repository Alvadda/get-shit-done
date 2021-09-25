import request from 'supertest'
import startServer from '../src/server'
import { TodoConnectorMock } from './mock/todo.mock'
import dotenv from 'dotenv'
import { UserConnectorMock } from './mock/user.mock'
dotenv.config()

const TOKEN = process.env.TEST_TOKEN || ''

const todoMock = new TodoConnectorMock()
const userMock = new UserConnectorMock()
const server = startServer(todoMock, userMock)

describe('Todos', () => {
    test('p_get_todos', async () => {
        const result = await request(server).get('/todos').send().set('jwt_token', TOKEN)

        expect(result.statusCode).toBe(200)
        expect(todoMock.readTodos.mock.calls.length).toBe(1)
        expect(result.body).not.toBeNull()
        expect(result.body.length).toBe(3)
    })
})

describe('Auth', () => {
    beforeEach(() => {
        userMock.createUser.mockClear()
        userMock.readUser.mockClear()
    })

    test('p_login', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'test@login.de',
            password: '123',
        })
        expect(result.statusCode).toBe(200)
        expect(userMock.readUser.mock.calls.length).toBe(1)
        expect(result.body).not.toBeNull()
        expect(result.body.token).not.toBeNull()
    })

    test('n_login_wrong_email', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'test@test.de',
            password: '123',
        })
        expect(result.statusCode).toBe(403)
        expect(result.body.message).toBe('Password or Email is incorrect')
    })

    test('n_login_wrong_password', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'test@login.de',
            password: '321',
        })

        expect(result.statusCode).toBe(403)
        expect(result.body.message).toBe('Password or Email is incorrect')
    })

    test('n_login_no_email', async () => {
        const result = await request(server).post('/auth/login').send({
            password: '123',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('Email is required')
    })

    test('n_login_no_valid_email', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'testlogin.de',
            password: '123',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('Must be a valid email')
    })

    test('n_login_no_password', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'test@login.de',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('password is required')
    })

    test('p_register', async () => {
        const result = await request(server).post('/auth/register').send({
            name: 'testRegister',
            email: 'test@register.de',
            password: '123',
        })

        expect(userMock.readUser.mock.calls.length).toBe(1)
        expect(result.statusCode).toBe(200)
        expect(userMock.createUser.mock.calls.length).toBe(1)
        expect(result.body).not.toBeNull()
        expect(result.body.token).not.toBeNull()
    })

    test('n_register_user_exist', async () => {
        const result = await request(server).post('/auth/register').send({
            name: 'login',
            email: 'test@login.de',
            password: '123',
        })

        expect(result.statusCode).toBe(401)
        expect(userMock.readUser.mock.calls.length).toBe(1)
        expect(userMock.createUser.mock.calls.length).toBe(0)
        expect(result.body.message).toBe('User alrdy exist')
    })

    test('n_register_no_name', async () => {
        const result = await request(server).post('/auth/register').send({
            email: 'test@login.de',
            password: '123',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('Name is required')
    })
    test('n_register_no_email', async () => {
        const result = await request(server).post('/auth/register').send({
            name: 'register',
            password: '123',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('Email is required')
    })

    test('n_register_no_valid_email', async () => {
        const result = await request(server).post('/auth/register').send({
            name: 'register',
            email: 'testlogin.de',
            password: '123',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('Must be a valid email')
    })

    test('n_register_no_password', async () => {
        const result = await request(server).post('/auth/register').send({
            name: 'register',
            email: 'test@login.de',
        })

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBe('password is required')
    })
})
