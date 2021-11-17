import React from 'react'
import { render, screen, userEvent } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import TodoItem from '../TodoItem/TodoItem'
import { Todo } from '../../utils/api'

const todo: Todo = {
    id: '1',
    description: 'test Todo',
    done: false,
    douDate: new Date('December 17, 2030'),
    project: {
        id: '1',
        name: 'test project',
    },
}

describe('TodoItem', () => {
    it('renders', () => {
        render(<TodoItem todo={todo} onDone={() => {}} onUpdate={() => {}} onDelete={() => {}} />)
        expect(screen.getByText(todo.description)).toBeInTheDocument()
    })

    it('check fields with project', () => {
        const { queryByTestId } = render(<TodoItem todo={todo} onDone={() => {}} onUpdate={() => {}} onDelete={() => {}} />)
        expect(screen.getByTestId('checkbox')).toBeInTheDocument()
        expect(screen.getByText('test project')).toBeInTheDocument()
        expect(queryByTestId('select')).toBeNull()
        expect(screen.getByText('17.12.2030')).toBeInTheDocument()
    })

    it('check fields without project', () => {
        const todo: Todo = {
            description: 'test Todo',
            done: false,
            douDate: new Date('December 17, 2030'),
        }
        const { queryByText } = render(<TodoItem todo={todo} onDone={() => {}} onUpdate={() => {}} onDelete={() => {}} />)
        expect(screen.getByTestId('checkbox')).toBeInTheDocument()
        expect(queryByText('test project')).toBeNull()
        expect(screen.getByTestId('select')).toBeInTheDocument()
        expect(screen.getByText('17.12.2030')).toBeInTheDocument()
    })

    it('check onDone', () => {
        const onDone = (id: string) => {
            expect(id).toBe('2')
        }
        render(<TodoItem todo={todo} onDone={onDone} onUpdate={() => {}} onDelete={() => {}} />)
        const done = screen.getByRole('button')
        userEvent.click(done)
    })
})
