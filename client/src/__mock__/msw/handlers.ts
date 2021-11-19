import { rest } from 'msw'
import { Todo, Project } from '../../utils/api'
import Todos from './respons/todos.json'
import Projects from './respons/projects.json'

const prefix = ''

const todoList: Todo[] = [...(Todos as unknown as Todo[])]
const projectList: Project[] = [...(Projects as unknown as Project[])]

export const handlers = [
    rest.post(`${prefix}/auth/login`, (req, res, ctx) => {
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
]
