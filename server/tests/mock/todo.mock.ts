import { ITodoConnector, Todo } from '../../src/interfaces/todo.interfaces'

const todos: Todo[] = [
    {
        id: '1',
        description: 'test Todo 1',
        done: false,
        project: {
            id: '1',
            name: 'test',
        },
    },
    {
        id: '2',
        description: 'test Todo 2',
        done: false,
        project: {
            id: '1',
            name: 'test',
        },
    },
    {
        id: '3',
        description: 'test Todo 3',
        done: false,
        project: {
            id: '1',
            name: 'test',
        },
    },
]
export class TodoConnectorMock implements ITodoConnector {
    readTodos = jest.fn().mockReturnValue(todos)
    readTodo = jest.fn().mockReturnValue(todos[0])
    createTodo = jest.fn().mockReturnValue((test) => test)
    updateTodo = jest.fn()
    deleteTodo = jest.fn()
    createSendTodoSession = jest.fn()
    getSendTodoSession = jest.fn()
}
