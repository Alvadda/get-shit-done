import projectRoutes, { initProjectRoute } from './routes/project.routes'
import { IProjectConnector } from './interfaces/project.interfaces'
import { Application } from 'express'
import { ITodoConnector } from './interfaces/todo.interfaces'
import { IUserConnector } from './interfaces/user.interfaces'
import todosRoutes, { initTodoRoute } from './routes/todos.routes'
import authRoutes, { initAuthRoute } from './routes/auth.routes'
import sendTodoRoutes, { initSendTodoRoute } from './routes/sendTodo.routes'
import express from 'express'
import cors from 'cors'

export default (todoConnector: ITodoConnector, userConnector: IUserConnector, ProjectConnector: IProjectConnector) => {
    const app: Application = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

    //Routes
    initTodoRoute(todoConnector)
    initSendTodoRoute(todoConnector)
    initAuthRoute(userConnector)
    initProjectRoute(ProjectConnector)

    app.use('/todos', todosRoutes)
    app.use('/auth', authRoutes)
    app.use('/projects', projectRoutes)
    app.use('/sendtodo', sendTodoRoutes)
    return app
}
