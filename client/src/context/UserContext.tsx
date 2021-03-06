import userReducer from '../reducer/userReducer'
import React, { createContext, FC, useContext, useReducer } from 'react'
import { UserState, UserAction } from '../types/userContext.types'

interface UserContextValue {
    state: UserState
    dispatch: (action: UserAction) => void
}

const InitialUserState: UserState = {}
const UserContext = createContext<UserContextValue>({ state: InitialUserState, dispatch: () => {} })

export const useUserContext = () => useContext<UserContextValue>(UserContext)

const UserProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, InitialUserState)
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export default UserProvider
