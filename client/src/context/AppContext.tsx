import React, { createContext, FC, useContext, useReducer } from 'react'
import todoReducer from '../reducer/todoReducer'
import { TodoAction, AppState, ProjectTypes } from '../types/appContext.types'

interface AppContextValue {
    state: AppState
    dispatch: (action: TodoAction) => void
}

const InitialAppState: AppState = {
    todos: [],
    projects: [],
    selectedProjectType: ProjectTypes.Inbox,
}
const AppContext = createContext<AppContextValue>({ state: InitialAppState, dispatch: () => {} })

export const useAppContext = () => useContext<AppContextValue>(AppContext)

const TodoProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, InitialAppState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default TodoProvider
