import { Application } from 'express'
import todosRoutes, { initTodoRoute } from './routes/todos.routes'
import express from 'express'
import log from './logger/logger'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import TodoPostgresConnector from './service/todo.service'
import { ITodoConnector } from './interfaces/todo.interfaces'

export default (todoConnector: ITodoConnector) => {
    const app: Application = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

    //Routes
    initTodoRoute(new TodoPostgresConnector())

    app.use('/todos', todosRoutes)
    app.use('/auth', authRoutes)
    return app
}
