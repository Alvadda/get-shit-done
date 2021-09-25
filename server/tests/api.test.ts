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
    test('p_login', async () => {
        const result = await request(server).post('/auth/login').send({
            email: 'test@test.de',
            password: '123',
        })

        expect(result.statusCode).toBe(200)
        expect(userMock.readUser.mock.calls.length).toBe(1)
        expect(result.body).not.toBeNull()
        expect(result.body.token).not.toBeNull()
    })
})
