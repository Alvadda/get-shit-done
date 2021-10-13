import { Project, Todo } from './../utils/api'

export interface TodoState {
    todos: Todo[]
    projects: Project[]
}

interface SetTodos {
    type: 'SET_TODOS'
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

interface SetProjects {
    type: 'SET_PROJECTS'
    projects: Project[]
}

export type TodoAktion = SetTodos | AddTodo | DeleteTodo | UpdateTodo | SetProjects
