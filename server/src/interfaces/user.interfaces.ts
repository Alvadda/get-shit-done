export interface User {
    id: string
    name: string
    email: string
    password: string
}

export interface IUserConnector {
    readUser: (email: string) => Promise<User | undefined>
    createUser: (name: string, email: string, password: string) => Promise<User | undefined>
}
