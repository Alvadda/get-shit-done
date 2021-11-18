import { Project, Todo } from '../utils/api'

export interface AppState {
    todos: Todo[]
    projects: Project[]
    selectedProject?: string
    selectedProjectType: ProjectTypes
}

export enum ProjectTypes {
    Inbox,
    DoNow,
    DoSoon,
    Id,
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

interface AddProject {
    type: 'ADD_PROJECTS'
    projects: Project[]
}

interface setSelectedProject {
    type: 'SET_SELECTED_PROJECT'
    selectProjectType: ProjectTypes
    id?: string
}

export type AppAction = SetTodos | AddTodo | DeleteTodo | UpdateTodo | SetProjects | setSelectedProject | AddProject
