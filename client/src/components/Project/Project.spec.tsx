import React from 'react'
import { render, screen, userEvent } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import Project from '../Project/Project'

const project = {
    id: '1',
    name: 'test',
}

describe('Project', () => {
    it('renders', () => {
        render(<Project onSelect={() => {}} project={project} numberOfTodos={0} />)
        expect(screen.getByText('test')).toHaveTextContent('test')
    })

    it('check if project name is right', () => {
        const project = {
            id: '1',
            name: 'Project 1',
        }
        render(<Project onSelect={() => {}} project={project} numberOfTodos={0} />)
        expect(screen.getByText('Project 1')).toHaveTextContent('Project 1')
    })

    it('check if number of todos right', () => {
        render(<Project onSelect={() => {}} project={project} numberOfTodos={24} />)
        expect(screen.getByText('test')).toBeInTheDocument()
        expect(screen.getByText('24')).toBeInTheDocument()
    })

    it('check onselect gets called', () => {
        const onSelect = jest.fn()

        render(<Project onSelect={onSelect} project={project} numberOfTodos={0} />)
        const projectEle = screen.getByText('test')
        expect(projectEle).toHaveTextContent('test')
        userEvent.click(projectEle)
        expect(onSelect.mock.calls.length).toBe(1)
    })
})
