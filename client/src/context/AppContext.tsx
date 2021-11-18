import React, { createContext, FC, useContext, useEffect, useReducer } from 'react'
import appReducer from '../reducer/appReducer'
import { AppAction, AppState, ProjectTypes } from '../types/appContext.types'
import { initProjects, initTodos } from '../reducer/initTestState'

interface AppContextValue {
    state: AppState
    dispatch: (action: AppAction) => void
}

const InitialAppState: AppState = {
    todos: [],
    projects: [],
    selectedProjectType: ProjectTypes.Inbox,
}
const AppContext = createContext<AppContextValue>({ state: InitialAppState, dispatch: () => {} })

export const useAppContext = () => useContext<AppContextValue>(AppContext)

const AppProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, InitialAppState)
    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            dispatch({ type: 'SET_TODOS', todos: initTodos })
            dispatch({ type: 'SET_PROJECTS', projects: initProjects })
        }
    }, [])
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export default AppProvider
