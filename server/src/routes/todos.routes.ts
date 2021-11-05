import { ITodoConnector } from './../interfaces/todo.interfaces'
import { Router } from 'express'
import { createTodoSchema, deleteTodoSchema, readTodoSchema, updateTodoSchema } from '../schema/todos.schema'
import TodoController from '../controller/todo.controller'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'

const router = Router()

export const initTodoRoute = (connector: ITodoConnector) => {
    const controller = new TodoController(connector)

    router.get('/', authorization, controller.readTodosHandler)
    router.get('/:id', valdiation(readTodoSchema), authorization, controller.readTodoHandler)
    router.post('/', valdiation(createTodoSchema), authorization, controller.createTodosHandler)
    router.put('/:id', valdiation(updateTodoSchema), authorization, controller.updateTodosHandler)
    router.delete('/:id', valdiation(deleteTodoSchema), authorization, controller.deleteTodosHandler)

    router.post('/sendTodoSession', authorization, controller.createSendTodoSessionHandler)
}

export default router
