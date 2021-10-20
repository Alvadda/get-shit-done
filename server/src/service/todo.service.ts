import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import log from '../logger/logger'
import { Todo, ITodoConnector } from '../interfaces/todo.interfaces'

export default class TodoPostgresConnector implements ITodoConnector {
    private readonly _db = dbCtx

    async readTodos(userId: string) {
        try {
            const todosDb = await this._db.query('SELECT * FROM todo WHERE user_id = ($1) AND done = false ORDER BY created_at DESC', [
                userId,
            ])
            return this._mapTodos(todosDb)
        } catch (error) {
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
                'UPDATE todo SET description = ($1), done = ($2) WHERE todo_id = ($3) AND user_id = ($4) RETURNING *',
                [todo.description, todo.done, todo.id, userId]
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

    _mapTodos = (todosDb: QueryResult<any>) => {
        if (todosDb.rows.length < 1) return []
        const todos: Todo[] = todosDb.rows.map((todo) => ({
            id: todo.todo_id,
            description: todo.description,
            createdAt: new Date(todo.created_at),
            done: todo.done,
            doneDate: todo.done_date,
            douDate: todo.dou_date ? new Date(todo.dou_date) : undefined,
            projectId: todo.project_id,
        }))
        return todos
    }
}
