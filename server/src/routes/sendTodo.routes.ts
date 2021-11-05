import { ITodoConnector } from './../interfaces/todo.interfaces'
import { Router } from 'express'
import { validSendTodoSessionSchema } from '../schema/todos.schema'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'
import SendTodoController from '../controller/sendTodo.controller'

const router = Router()

export const initSendTodoRoute = (connector: ITodoConnector) => {
    const controller = new SendTodoController(connector)

    router.post('/', authorization, controller.createSendTodoSessionHandler)
    router.get('/isvalid/:id', valdiation(validSendTodoSessionSchema), controller.isSendTodoSessionValidHandler)
}

export default router
