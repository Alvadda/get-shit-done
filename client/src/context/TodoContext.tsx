import React, { createContext, FC, useContext, useReducer } from 'react'
import todoReducer from '../reducer/todoReducer'
import { TodoAktion, TodoState } from '../types/todoContext.types'

interface TodoContextValue {
    state: TodoState
    dispatch: (aktion: TodoAktion) => void
}

const InitialTodoState: TodoState = {
    todos: [],
    projects: [],
}
const TodoContext = createContext<TodoContextValue>({ state: InitialTodoState, dispatch: () => {} })

export const useTodoContext = () => useContext<TodoContextValue>(TodoContext)

const TodoProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, InitialTodoState)
    return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>
}

export default TodoProvider
