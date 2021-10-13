import { TodoAktion, TodoState } from './../types/types'

const todoReducer = (state: TodoState, aktion: TodoAktion) => {
    switch (aktion.type) {
        case 'GET_TODOS':
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
        default:
            return state
    }
}

export default todoReducer
