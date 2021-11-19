import React from 'react'
import { render, screen } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import TodoList from './TodoList'

describe('TodoItem', () => {
    it('renders', () => {
        render(<TodoList />)
        expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    })

    it('check todos', () => {
        render(<TodoList />)
        expect(screen.getByTestId('todo-list')).toBeInTheDocument()
        expect(screen.getByText('inbox')).toBeInTheDocument()
    })
})
