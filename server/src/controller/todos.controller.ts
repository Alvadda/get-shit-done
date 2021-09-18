import { Request, Response } from 'express'
import { Todo, readTodos, readTodo, createTodo, updateTodo, deleteTodo } from '../service/todos.service'
import log from '../logger/logger'

const readTodosHandler = async (req: Request, res: Response) => {
    const userId = res.locals.userId
    try {
        const todos = await readTodos(userId)
        res.json(todos)
    } catch (err: any) {
        log.error(err.message)
        res.sendStatus(500)
    }
}

const readTodoHandler = async (req: Request, res: Response) => {
    const userId = res.locals.userId
    const { id } = req.params
    try {
        const todos = await readTodo(id)
        res.json(todos)
    } catch (err: any) {
        log.error(err.message)
        res.sendStatus(500)
    }
}

const createTodosHandler = async (req: Request, res: Response) => {
    const { description } = req.body
    const userId = res.locals.userId
    try {
        const newTodo = await createTodo(userId, description)
        res.json(newTodo)
    } catch (err: any) {
        console.error(err.message)
        res.sendStatus(500)
    }
}

const updateTodosHandler = async (req: Request, res: Response) => {
    const userId = res.locals.userId
    const todo: Todo = {
        id: req.params.id,
        description: req.body.description,
    }
    try {
        const updatedTodo = await updateTodo(userId, todo)
        res.json(updatedTodo)
    } catch (err: any) {
        console.error(err.message)
        res.sendStatus(500)
    }
}

const deleteTodosHandler = async (req: Request, res: Response) => {
    const userId = res.locals.userId
    const { id } = req.params
    try {
        await deleteTodo(userId, id)
        res.sendStatus(200)
    } catch (err: any) {
        console.error(err.message)
        res.sendStatus(500)
    }
}

export { readTodosHandler, createTodosHandler, readTodoHandler, updateTodosHandler, deleteTodosHandler }
