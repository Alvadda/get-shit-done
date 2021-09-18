import { Router } from 'express'
import {
    createTodosHandler,
    readTodoHandler,
    readTodosHandler,
    updateTodosHandler,
    deleteTodosHandler,
} from '../controller/todos.controller'
import { createTodoSchema, deleteTodoSchema, readTodoSchema, updateTodoSchema } from '../schema/todos.schema'
import valdiation from '../middleware/validation.middleware'
import authorization from '../middleware/auth.middleware'

const router = Router()

router.get('/', authorization, readTodosHandler)
router.get('/:id', valdiation(readTodoSchema), authorization, readTodoHandler)
router.post('/', valdiation(createTodoSchema), authorization, createTodosHandler)
router.put('/:id', valdiation(updateTodoSchema), authorization, updateTodosHandler)
router.delete('/:id', valdiation(deleteTodoSchema), authorization, deleteTodosHandler)

export default router
