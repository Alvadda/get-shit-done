import { date } from 'yup'
import { Project } from './project.interfaces'
export interface Todo {
    id: string
    description: string
    done: boolean
    createdAt?: Date
    douDate?: Date | null
    doneDate?: Date | null
    project?: Project
}

export interface SendTodoSession {
    guid: string
    userId: string
    maxTodos?: string
    expirationDate?: Date
}

export interface ITodoConnector {
    readTodos: (userId: string) => Promise<Todo[] | undefined>
    readTodo: (todoId: string) => Promise<Todo[] | undefined>
    createTodo: (userId: string, description: string, douDate: Date | null, projectId: string | null) => Promise<Todo[] | undefined>
    updateTodo: (userId: string, todo: Todo) => Promise<Todo[] | undefined>
    deleteTodo: (userId: string, id: string) => Promise<boolean>
    createSendTodoSession: (userId: string, maxTodos?: string, expirationDate?: Date) => Promise<string>
    getSendTodoSession: (sessionId: string) => Promise<SendTodoSession | undefined>
}
