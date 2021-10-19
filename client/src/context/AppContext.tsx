import React, { createContext, FC, useContext, useReducer } from 'react'
import todoReducer from '../reducer/todoReducer'
import { TodoAktion, AppState } from '../types/appContext.types'

interface AppContextValue {
    state: AppState
    dispatch: (aktion: TodoAktion) => void
}

const InitialAppState: AppState = {
    todos: [],
    projects: [],
    selectedProject: null,
}
const AppContext = createContext<AppContextValue>({ state: InitialAppState, dispatch: () => {} })

export const useAppContext = () => useContext<AppContextValue>(AppContext)

const TodoProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, InitialAppState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default TodoProvider
