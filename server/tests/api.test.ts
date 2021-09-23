import request from 'supertest'
import startServer from '../src/server'
import { TodoConnectorMock } from './mock/todo.mock'
import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.TEST_TOKEN || ''

const mock = new TodoConnectorMock()
const server = startServer(mock)

describe('describe', () => {
    test('test', async () => {
        const result = await request(server).get('/todos').send().set('jwt_token', TOKEN)
        console.log(result.body)
        expect(mock.readTodos.mock.calls.length).toBe(1)
        expect(result.body).not.toBeNull()
        expect(result.body.length).toBe(3)
    })
})
