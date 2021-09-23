import { Application } from 'express'
import todosRoutes, { initTodoRoute } from './routes/todos.routes'
import express from 'express'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import { ITodoConnector } from './interfaces/todo.interfaces'

export default (todoConnector: ITodoConnector) => {
    const app: Application = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

    //Routes
    initTodoRoute(todoConnector)

    app.use('/todos', todosRoutes)
    app.use('/auth', authRoutes)
    return app
}
