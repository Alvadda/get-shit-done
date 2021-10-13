import { UserState, UserAktion } from './../types/userContext.types'

const userReducer = (state: UserState, aktion: UserAktion) => {
    switch (aktion.type) {
        case 'LOGIN':
            return {
                user: aktion.user,
                authToken: aktion.authToken,
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}

export default userReducer
