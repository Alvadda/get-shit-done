import { TodoAktion, AppState } from './../types/appContext.types'

const todoReducer = (state: AppState, aktion: TodoAktion) => {
    switch (aktion.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: [...aktion.todos],
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...aktion.todos, ...state.todos],
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) => (todo.id === aktion.todo.id ? aktion.todo : todo)),
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== aktion.id),
            }
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: [...aktion.projects],
            }
        case 'SET_SELECTED_PROJECT':
            return {
                ...state,
                selectedProject: aktion.id,
            }
        default:
            return state
    }
}

export default todoReducer
