import { IUserConnector, User } from '../../src/interfaces/user.interfaces'

const userLogin: User = {
    id: '1',
    name: 'testLogin',
    email: 'test@login.de',
    password: '$2b$10$Hrp7lBCybYdKPF.DNz5ZhuX305m.a4zlJRkPKhRf8rZFLRrkangfG', //123
}

const userRegister: User = {
    id: '2',
    name: 'testRegister',
    email: 'test@Register.de',
    password: '$2b$10$Hrp7lBCybYdKPF.DNz5ZhuX305m.a4zlJRkPKhRf8rZFLRrkangfG', //123
}

export class UserConnectorMock implements IUserConnector {
    readUser = jest.fn((email: string) => {
        if (email === userLogin.email) return Promise.resolve(userLogin)
        return Promise.resolve(undefined)
    })
    createUser = jest.fn().mockReturnValueOnce(userRegister)
}
