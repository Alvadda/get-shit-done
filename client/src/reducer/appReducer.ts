import { TodoAction, AppState } from '../types/appContext.types'

const appReducer = (state: AppState, action: TodoAction) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: [...action.todos],
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...action.todos, ...state.todos],
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) => (todo.id === action.todo.id ? action.todo : todo)),
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            }
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: [...action.projects],
            }
        case 'ADD_PROJECTS':
            return {
                ...state,
                projects: [...state.projects, ...action.projects],
            }
        case 'SET_SELECTED_PROJECT':
            return {
                ...state,
                selectedProjectType: action.selectProjectType,
                selectedProject: action.id,
            }
        default:
            return state
    }
}

export default appReducer
