import React from 'react'
import { fireEvent, render, screen, userEvent } from '../../utils/test-util'
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

    it('check on done', () => {
        jest.useFakeTimers()
        const onDone = (id: string) => {
            expect(id).toBe('1')
        }
        render(<TodoItem todo={todo} onDone={onDone} onUpdate={() => {}} onDelete={() => {}} />)
        const done = screen.getByTestId('checkbox')
        userEvent.click(done)
        setTimeout(() => {}, 650)
        jest.runAllTimers()
    })

    it('check on update', () => {
        const todo: Todo = {
            description: 'test Todo',
            done: false,
            douDate: new Date('December 17, 2030'),
        }
        const onUpdate = (todo: Todo) => {
            expect(todo.project?.name).toBe('Project 1')
        }
        render(<TodoItem todo={todo} onDone={() => {}} onUpdate={onUpdate} onDelete={() => {}} />)
        setTimeout(() => {}, 650)
        const select = screen.getByTestId('select')
        const project = screen.getByText('Project 1')
        expect(select).toBeTruthy()
        expect(project).toBeTruthy()
        fireEvent.change(select, { target: { value: '1' } })
    })

    it('check on delete', () => {
        const onDelete = (id: string) => {
            expect(id).toBe('1')
        }
        render(<TodoItem todo={todo} onDone={() => {}} onUpdate={() => {}} onDelete={onDelete} />)
        const deleteButton = screen.getByRole('button')
        userEvent.click(deleteButton)
    })
})
