export interface Todo {
    id: string
    description: string
    done: boolean
    createdAt?: Date
    douDate?: Date | null
    doneDate?: Date | null
}

export interface ITodoConnector {
    readTodos: (userId: string) => Promise<Todo[] | undefined>
    createTodo: (userId: string, description: string, douDate: Date | null) => Promise<Todo[] | undefined>
    updateTodo: (userId: string, todo: Todo) => Promise<Todo[] | undefined>
    deleteTodo: (userId: string, id: string) => Promise<boolean>
}
