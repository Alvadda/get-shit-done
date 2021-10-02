import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import log from '../logger/logger'
import { Todo, ITodoConnector } from '../interfaces/todo.interfaces'

export default class TodoPostgresConnector implements ITodoConnector {
    private readonly _db = dbCtx

    async readTodos(userId: string) {
        try {
            const todosDb = await this._db.query('SELECT * FROM todo WHERE user_id = ($1)', [userId])
            return mapTodos(todosDb)
        } catch (error) {
            log.error('cant read todos', error)
        }
    }

    async createTodo(userId: string, description: string) {
        try {
            const todosDb = await this._db.query('INSERT INTO todo (description, user_id) VALUES ($1, $2) RETURNING *', [
                description,
                userId,
            ])
            return mapTodos(todosDb)
        } catch (error) {
            log.error(`cant create todo with description: ${description}`, error)
        }
    }

    async updateTodo(userId: string, todo: Todo) {
        try {
            const todosDb = await this._db.query('UPDATE todo SET description = ($1) WHERE todo_id = ($2) AND user_id = ($3) RETURNING *', [
                todo.description,
                todo.id,
                userId,
            ])
            return mapTodos(todosDb)
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
}

const mapTodos = (todosDb: QueryResult<any>) => {
    const todos: Todo[] = []
    if (todosDb.rows.length > 0) {
        todosDb.rows.forEach((todo) => {
            console.log(todo)
            todos.push({
                id: todo.todo_id,
                description: todo.description,
                createdAt: todo.created_at,
                done: todo.done,
                doneDate: todo.done_date,
                douDate: todo.dou_date ? todo.dou_date : undefined,
            })
        })
    }
    console.log(todos)
    return todos
}
