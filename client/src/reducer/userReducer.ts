import { UserState, UserAction } from './../types/userContext.types'

const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.user,
                authToken: action.authToken,
            }
        case 'LOGOUT':
            return {}
        case 'ERROR':
            return {
                ...state,
                errorMessage: action.message,
            }
        default:
            return state
    }
}

export default userReducer
