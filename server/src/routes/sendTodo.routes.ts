import { ITodoConnector } from './../interfaces/todo.interfaces'
import { Router } from 'express'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'
import SendTodoController from '../controller/sendTodo.controller'
import { sendTodoSchema, validSendTodoSessionSchema } from '../schema/sendTodo.schema'

const router = Router()

export const initSendTodoRoute = (connector: ITodoConnector) => {
    const controller = new SendTodoController(connector)

    router.post('/', authorization, controller.createSendTodoSessionHandler)
    router.get('/isvalid/:id', valdiation(validSendTodoSessionSchema), controller.isSendTodoSessionValidHandler)
    router.post('/:id', valdiation(sendTodoSchema), controller.sendTodosHandler)
}

export default router
