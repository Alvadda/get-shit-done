import { QueryResult } from 'pg'
import dbCtx from '../database/dbConnect'
import log from '../logger/logger'

export interface Todo {
    id: string
    description: string
    createdAt?: Date
}

const readTodos = async (userId: string) => {
    try {
        const todosDb = await dbCtx.query('SELECT * FROM todo WHERE user_id = ($1)', [userId])
        return mapTodos(todosDb)
    } catch (error) {
        log.error('cant read todos', error)
    }
}

const readTodo = async (id: string) => {
    try {
        const todosDb = await dbCtx.query('SELECT * FROM todo WHERE todo_id = ($1)', [id])
        return mapTodos(todosDb)
    } catch (error) {
        log.error(`cant read todo with id: ${id}`, error)
    }
}

const createTodo = async (userId: string, description: string) => {
    try {
        const todosDb = await dbCtx.query('INSERT INTO todo (description, user_id) VALUES ($1, $2) RETURNING *', [description, userId])
        return mapTodos(todosDb)
    } catch (error) {
        log.error(`cant create todo with description: ${description}`, error)
    }
}

const updateTodo = async (userId: string, todo: Todo) => {
    try {
        const todosDb = await dbCtx.query('UPDATE todo SET description = ($1) WHERE todo_id = ($2) AND user_id = ($3) RETURNING *', [
            todo.description,
            todo.id,
            userId,
        ])
        return mapTodos(todosDb)
    } catch (error) {
        log.error(`cant update todo with Id ${todo.id}`, error)
    }
}

const deleteTodo = async (userId: string, id: string) => {
    try {
        await dbCtx.query('DELETE FROM todo WHERE todo_id = ($1) AND user_id = ($2)', [id, userId])
    } catch (error) {
        log.error(`cant delete todo with Id ${id}`, error)
    }
}

const mapTodos = (todosDb: QueryResult<any>) => {
    const todos: Todo[] = []
    if (todosDb.rows.length > 0) {
        todosDb.rows.forEach((todo) => {
            todos.push({
                id: todo.todo_id,
                description: todo.description,
                createdAt: todo.created_at,
            })
        })
    }
    return todos
}

export { readTodos, readTodo, createTodo, updateTodo, deleteTodo }
