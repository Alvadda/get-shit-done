export interface Todo {
    id: string
    description: string
    createdAt?: Date
}

export interface ITodoConnector {
    readTodos: (userId: string) => Promise<Todo[] | undefined>
    createTodo: (userId: string, description: string) => Promise<Todo[] | undefined>
    updateTodo: (userId: string, todo: Todo) => Promise<Todo[] | undefined>
    deleteTodo: (userId: string, id: string) => Promise<boolean>
}
