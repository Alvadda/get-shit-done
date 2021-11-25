import { rest } from 'msw'
import { Todo, Project } from '../../utils/api'
import Todos from './respons/todos.json'
import Projects from './respons/projects.json'

interface Login {
    email: string
    password: string
}

const prefix = ''

const todoList: Todo[] = [...(Todos as unknown as Todo[])]
const projectList: Project[] = [...(Projects as unknown as Project[])]
const sendTodoSession = '023842ljn4i4k13b1k2j3hjvb1u4'
const testUser: Login = {
    email: 'test@user.de',
    password: '123',
}

let todosLeft = 3

export const handlers = [
    rest.post<Login>(`${prefix}/auth/login`, (req, res, ctx) => {
        const user = req.body
        if (JSON.stringify(user) !== JSON.stringify(testUser)) return res(ctx.status(401))

        return res(ctx.status(200), ctx.json({ userName: 'testUser', token: '12n3k1j2h31k4h132lkj12kj3h' }))
    }),

    rest.get(`${prefix}/projects`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(projectList))
    }),
    rest.post<Project>(`${prefix}/projects`, (req, res, ctx) => {
        const project = req.body
        project.id = Math.floor(Math.random() * 100).toString()
        projectList.push(project)
        return res(ctx.status(200), ctx.json([project]))
    }),

    rest.get(`${prefix}/todos`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(todoList))
    }),
    rest.delete(`${prefix}/todos/:id`, (req, res, ctx) => {
        return res(ctx.status(200))
    }),
    rest.post<Todo>(`${prefix}/todos`, (req, res, ctx) => {
        const todo = req.body
        todo.id = Math.floor(Math.random() * 100).toString()
        todoList.push(todo)
        return res(ctx.status(200), ctx.json([todo]))
    }),
    rest.put<Todo>(`${prefix}/todos/:id`, (req, res, ctx) => {
        const todo = req.body
        return res(ctx.status(200), ctx.json([todo]))
    }),

    rest.post(`${prefix}/sendtodo`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ send_session_id: sendTodoSession }))
    }),
    rest.post<Todo>(`${prefix}/sendtodo/:id`, (req, res, ctx) => {
        if (todosLeft < 1) return res(ctx.status(403), ctx.json({ errorMessage: 'You cant send more Todos' }))
        todosLeft--
        const todo = req.body
        return res(ctx.status(200), ctx.json([todo]))
    }),
    rest.get(`${prefix}/sendtodo/isvalid/:id`, (req, res, ctx) => {
        const { id } = req.params
        if (id === sendTodoSession) {
            return res(ctx.status(200), ctx.json({ user: 'TestUser', todosLeft }))
        }
        return res(ctx.status(401))
    }),
]
