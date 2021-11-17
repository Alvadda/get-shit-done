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
        expect(screen.getByText('test 0')).toHaveTextContent('test')
    })

    it('check if project name is right', () => {
        const testProject = {
            id: '1',
            name: 'testProject',
        }
        render(<Project onSelect={() => {}} project={testProject} numberOfTodos={0} />)
        expect(screen.getByText('testProject 0')).toHaveTextContent('testProject')
    })

    it('check if number of todos right', () => {
        render(<Project onSelect={() => {}} project={project} numberOfTodos={24} />)
        expect(screen.getByText('test 24')).toHaveTextContent('24')
    })

    it('check onselect gets called', () => {
        const onSelect = jest.fn()

        render(<Project onSelect={onSelect} project={project} numberOfTodos={0} />)
        const projectEle = screen.getByText('test 0')
        expect(projectEle).toHaveTextContent('test')
        userEvent.click(projectEle)
        expect(onSelect.mock.calls.length).toBe(1)
    })
})
