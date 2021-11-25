import { SendTodoSession } from './../interfaces/todo.interfaces'
import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import log from '../logger/logger'
import { Todo, ITodoConnector } from '../interfaces/todo.interfaces'

export default class TodoPostgresConnector implements ITodoConnector {
    private readonly _db = dbCtx

    async readTodos(userId: string) {
        try {
            const todosDb = await this._db.query(
                'SELECT * FROM todo LEFT JOIN projects ON projects.project_id = todo.project_id WHERE todo.user_id = ($1) AND todo.done = false ORDER BY created_at DESC',
                [userId]
            )
            return this._mapTodos(todosDb)
        } catch (error) {
            console.log(error)
            log.error('cant read todos', error)
        }
    }

    async readTodo(todoId: string) {
        try {
            const todosDb = await this._db.query(
                'SELECT * FROM todo LEFT JOIN projects ON projects.project_id = todo.project_id WHERE todo.todo_id = ($1)',
                [todoId]
            )
            return this._mapTodos(todosDb)
        } catch (error) {
            console.log(error)
            log.error('cant read todos', error)
        }
    }

    async createTodo(userId: string, description: string, douDate: Date | null, projectId: string | null) {
        try {
            const todosDb = await this._db.query(
                'INSERT INTO todo (description, user_id, dou_date, project_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [description, userId, douDate, projectId]
            )
            return this._mapTodos(todosDb)
        } catch (error) {
            log.error(`cant create todo with description: ${description} ${error}`)
        }
    }

    async updateTodo(userId: string, todo: Todo) {
        try {
            const todosDb = await this._db.query(
                'UPDATE todo SET description = ($1), done = ($2), project_id = ($3) WHERE todo_id = ($4) AND user_id = ($5) RETURNING *',
                [todo.description, todo.done, todo.project?.id, todo.id, userId]
            )
            return this._mapTodos(todosDb)
        } catch (error) {
            log.error(`cant update todo with Id ${todo.id}`, error)
        }
    }

    async deleteTodo(userId: string, id: string) {
        try {
            await this._db.query('DELETE FROM todo WHERE todo_id = ($1) AND user_id = ($2)', [id, userId])
            return true
        } catch (error) {
            log.error(`cant delete todo with Id ${id}`, error)
            return false
        }
    }

    async createSendTodoSession(userId: string, maxTodos?: string, expirationDate?: Date) {
        console.log('createSendTodoSession', maxTodos, expirationDate)

        try {
            const SendTodoSessionDb = await this._db.query(
                'INSERT INTO send_session (user_id, max_todos, expiration_date) VALUES ($1, $2, $3) RETURNING send_session_id',
                [userId, maxTodos, expirationDate]
            )
            return SendTodoSessionDb.rows[0]
        } catch (error) {
            throw new Error(`Èrror in createSendTodoSession, Error: ${error}`)
        }
    }

    async getSendTodoSession(sessionId: string) {
        try {
            const sendTodoSessionDb = await this._db.query(
                'SELECT * FROM send_session LEFT JOIN users ON send_session.user_id = users.user_id ' +
                    ' WHERE send_session.send_session_id = ($1)',
                [sessionId]
            )
            return this._mapSendTodoSession(sendTodoSessionDb)
        } catch (error) {
            console.log('--------error--------', error)
            throw new Error(`Èrror in getSendTodoSession, Error: ${error}`)
        }
    }

    _mapTodos = (todosDb: QueryResult<any>) => {
        if (todosDb.rows.length < 1) return []
        const todos: Todo[] = todosDb.rows.map((todoDb) => {
            const todo: Todo = {
                id: todoDb.todo_id,
                description: todoDb.description,
                createdAt: new Date(todoDb.created_at),
                done: todoDb.done,
                doneDate: todoDb.done_date,
                douDate: todoDb.dou_date ? new Date(todoDb.dou_date) : undefined,
            }
            if (todoDb.project_id) {
                todo.project = {
                    id: todoDb.project_id,
                    name: todoDb.project_name,
                }
            }
            return todo
        })
        return todos
    }

    _mapSendTodoSession = (SendTodoSessionDb: QueryResult<any>): SendTodoSession | undefined => {
        if (SendTodoSessionDb.rows.length !== 1) return
        const sendTodoSession = SendTodoSessionDb.rows.shift()
        return {
            guid: sendTodoSession.send_session_id,
            userId: sendTodoSession.user_id,
            maxTodos: sendTodoSession.max_todos,
            expirationDate: sendTodoSession.expiration_date ? new Date(sendTodoSession.expiration_date) : undefined,
            user: sendTodoSession.user_name,
        }
    }
}
