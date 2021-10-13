import { Project, Todo } from './../utils/api'

export interface TodoState {
    todos: Todo[]
    projects: Project[]
}

interface GetTodos {
    type: 'GET_TODOS'
    todos: Todo[]
}

interface AddTodo {
    type: 'ADD_TODO'
    todos: Todo[]
}

interface UpdateTodo {
    type: 'UPDATE_TODO'
    todo: Todo
}

interface DeleteTodo {
    type: 'DELETE_TODO'
    id: string
}

export type TodoAktion = GetTodos | AddTodo | DeleteTodo | UpdateTodo
