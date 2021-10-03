import { ITodoConnector, Todo } from '../../src/interfaces/todo.interfaces'

const todos: Todo[] = [
    {
        id: '1',
        description: 'test Todo 1',
        done: false,
    },
    {
        id: '2',
        description: 'test Todo 2',
        done: false,
    },
    {
        id: '3',
        description: 'test Todo 3',
        done: false,
    },
]
export class TodoConnectorMock implements ITodoConnector {
    readTodos = jest.fn().mockReturnValue(todos)
    createTodo = jest.fn()
    updateTodo = jest.fn()
    deleteTodo = jest.fn()
}
