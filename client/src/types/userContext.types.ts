interface User {
    name: string
}

export interface UserState {
    user?: User
    authToken?: string
}

interface Login {
    type: 'LOGIN'
    user: User
    authToken: string
}
interface Logout {
    type: 'LOGOUT'
}

export type UserAction = Login | Logout
