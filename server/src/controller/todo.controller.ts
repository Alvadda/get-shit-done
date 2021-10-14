import { Todo, ITodoConnector } from '../interfaces/todo.interfaces'
import { Request, Response } from 'express'
import log from '../logger/logger'

export default class TodoController {
    todoConnector: ITodoConnector

    constructor(todoConnector: ITodoConnector) {
        this.todoConnector = todoConnector
    }

    readTodosHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        try {
            const todos = await this.todoConnector.readTodos(userId)
            res.json(todos)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    readTodoHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        try {
            const todos = await this.todoConnector.readTodos(userId)
            res.json(todos)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    createTodosHandler = async (req: Request, res: Response) => {
        const { description, douDate, projectId } = req.body
        const userId = res.locals.userId
        try {
            console.log('douDate', douDate)
            const newTodo = await this.todoConnector.createTodo(userId, description, douDate, projectId || null)

            res.json(newTodo)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    updateTodosHandler = async (req: Request, res: Response) => {
        const { description, done } = req.body
        const userId = res.locals.userId
        const todo: Todo = {
            id: req.params.id,
            description,
            done,
        }
        try {
            const updatedTodo = await this.todoConnector.updateTodo(userId, todo)
            res.json(updatedTodo)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    deleteTodosHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        const { id } = req.params
        try {
            const isSuccesful = await this.todoConnector.deleteTodo(userId, id)
            if (!isSuccesful) return res.sendStatus(409)
            res.sendStatus(200)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }
}
