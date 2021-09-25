import { IUserConnector, User } from '../../src/interfaces/user.interfaces'

const user: User = {
    id: '1',
    name: 'testUser',
    email: 'test@test.de',
    password: '$2b$10$Hrp7lBCybYdKPF.DNz5ZhuX305m.a4zlJRkPKhRf8rZFLRrkangfG', //123
}

export class UserConnectorMock implements IUserConnector {
    readUser = jest.fn().mockReturnValue(user)
    createUser = jest.fn()
}
