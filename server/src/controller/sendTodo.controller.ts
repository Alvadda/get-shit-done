import { formatErrorMessage } from './../logger/logger'
import { Todo, ITodoConnector, SendTodoSession } from '../interfaces/todo.interfaces'
import { Request, Response } from 'express'
import log from '../logger/logger'

export default class SendTodoController {
    todoConnector: ITodoConnector

    constructor(todoConnector: ITodoConnector) {
        this.todoConnector = todoConnector
    }

    createSendTodoSessionHandler = async (req: Request, res: Response) => {
        const userId = res.locals.userId
        const { todos, days } = req.query

        const expirationDate = new Date()
        const hasexpiration = days && Number(days) > 0
        if (hasexpiration) {
            expirationDate.setDate(expirationDate.getDate() + Number(days))
        }
        try {
            const SendTodoSessionId = await this.todoConnector.createSendTodoSession(
                userId,
                Number(todos),
                hasexpiration ? expirationDate : undefined
            )
            res.status(201).json(SendTodoSessionId)
        } catch (error: any) {
            log.error(error.message)
            res.sendStatus(500)
        }
    }

    sendTodosHandler = async (req: Request, res: Response) => {
        const { description, douDate } = req.body
        const { id } = req.params
        try {
            const sendTodoSession = await this.todoConnector.getSendTodoSession(id)
            const isValid = this._isSendTodoSessionValid(sendTodoSession)
            if (!sendTodoSession || !isValid) {
                return res.status(403).json(formatErrorMessage('You cant send more todos or the Session is expired'))
            }

            const todo = await this.todoConnector.createTodo(sendTodoSession?.userId, description, douDate, null)

            if (sendTodoSession.maxTodos && sendTodoSession.maxTodos > 0) sendTodoSession.maxTodos--
            await this.todoConnector.updateSendTodoSession(sendTodoSession)

            res.json(todo)
        } catch (err: any) {
            log.error(err.message)
            res.sendStatus(500)
        }
    }

    isSendTodoSessionValidHandler = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const sendTodoSession = await this.todoConnector.getSendTodoSession(id)
            const isValid = this._isSendTodoSessionValid(sendTodoSession)
            if (!sendTodoSession || !isValid) {
                return res.status(403).json(formatErrorMessage('You cant send more todos or the Session is expired'))
            }
            res.json({ user: sendTodoSession?.user, todosLeft: sendTodoSession.maxTodos })
        } catch (error: any) {
            log.error(error.message)
            res.sendStatus(500)
        }
    }

    _isSendTodoSessionValid = (sendTodoSession?: SendTodoSession) => {
        if (!sendTodoSession) return false
        const now = new Date()
        if (sendTodoSession.expirationDate && now > sendTodoSession.expirationDate) return false
        if (Number(sendTodoSession.maxTodos) < 1) return false

        return true
    }
}
