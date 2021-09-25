import { Application } from 'express'
import { ITodoConnector } from './interfaces/todo.interfaces'
import { IUserConnector } from './interfaces/user.interfaces'
import todosRoutes, { initTodoRoute } from './routes/todos.routes'
import authRoutes, { initAuthRoute } from './routes/auth.routes'
import express from 'express'
import cors from 'cors'

export default (todoConnector: ITodoConnector, userConnector: IUserConnector) => {
    const app: Application = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

    //Routes
    initTodoRoute(todoConnector)
    initAuthRoute(userConnector)

    app.use('/todos', todosRoutes)
    app.use('/auth', authRoutes)
    return app
}
