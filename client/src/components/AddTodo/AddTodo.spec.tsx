import React from 'react'
import { render, screen, userEvent, fireEvent } from '../../utils/test-util'

import AddTodo from '../AddTodo/AddTodo'

describe('SideBar', () => {
    it('renders', () => {
        render(<AddTodo onAddTodo={() => {}} />)
        expect(screen.getByTestId('add-todo')).toBeTruthy()
    })

    it('check fields', () => {
        render(<AddTodo onAddTodo={() => {}} showProjects />)
        expect(screen.getByPlaceholderText('Todo')).toBeTruthy()
        expect(screen.getAllByTestId('select')).toBeTruthy()
    })

    it('check hide projects on default', () => {
        const { queryByTestId } = render(<AddTodo onAddTodo={() => {}} />)
        expect(queryByTestId('select')).toBeNull()
    })

    it('check show project', () => {
        render(<AddTodo onAddTodo={() => {}} showProjects />)
        expect(screen.getAllByTestId('select')).toBeTruthy()
    })

    it('check add Todo gets called', () => {
        const addTodo = jest.fn()
        render(<AddTodo onAddTodo={addTodo} showProjects />)
        const addTodoButton = screen.getByTestId('add-todo-button')
        const todoInput = screen.getByPlaceholderText('Todo')
        fireEvent.change(todoInput, { target: { value: 'test' } })
        userEvent.click(addTodoButton)
        expect(addTodo.mock.calls.length).toBe(1)
    })

    it('check add Todo gets not called with emtpy todo', () => {
        const addTodo = jest.fn()
        render(<AddTodo onAddTodo={addTodo} showProjects />)
        const addTodoButton = screen.getByTestId('add-todo-button')
        userEvent.click(addTodoButton)
        expect(addTodo.mock.calls.length).toBe(0)
    })
})
