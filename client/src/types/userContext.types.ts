interface User {
    name: string
}

export interface UserState {
    user?: User
    authToken?: string
    errorMessage?: string
}

interface Login {
    type: 'LOGIN'
    user: User
    authToken: string
}
interface Logout {
    type: 'LOGOUT'
}

interface Error {
    type: 'ERROR'
    message: string
}

export type UserAction = Login | Logout | Error
