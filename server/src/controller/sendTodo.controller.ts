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
        //Todo maxTodos % expirationDate
        try {
            const SendTodoSessionId = await this.todoConnector.createSendTodoSession(userId)
            res.json(SendTodoSessionId)
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
            if (!sendTodoSession) return res.sendStatus(401)

            const todo = await this.todoConnector.createTodo(sendTodoSession.userId, description, douDate, null)
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
            if (!isValid) return res.sendStatus(401)
            res.sendStatus(200)
        } catch (error: any) {
            log.error(error.message)
            res.sendStatus(500)
        }
    }

    _isSendTodoSessionValid = (sendTodoSession?: SendTodoSession) => {
        if (!sendTodoSession) return false
        return true
    }
}
