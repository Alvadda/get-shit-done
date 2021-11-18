import React from 'react'
import { Project } from '../../utils/api'
import { fireEvent, render, screen, userEvent } from '../../utils/test-util'

import SelectProject from '../SelectProject/SelectProject'

describe('SelectProject', () => {
    it('renders', () => {
        render(<SelectProject onSelect={() => {}} />)
        expect(screen.getAllByTestId('select')).toBeTruthy()
    })

    it('default option', () => {
        render(<SelectProject onSelect={() => {}} />)
        expect(screen.getByTestId('select')).toBeTruthy()
        expect(screen.getByText('Select a Project:')).toBeTruthy()
    })

    it('check options', () => {
        render(<SelectProject onSelect={() => {}} />)
        expect(screen.getByTestId('select')).toBeTruthy()
        expect(screen.getAllByTestId('option').length).toBe(1)
        expect(screen.getByText('Select a Project:')).toBeTruthy()
        expect(screen.getByText('TestProject')).toBeTruthy()
    })

    it('check on option select', () => {
        const onSelect = (project: Project) => {
            expect(project.name).toBe('TestProject')
        }
        render(<SelectProject onSelect={onSelect} />)
        const select = screen.getByTestId('select')
        expect(select).toBeTruthy()
        expect(screen.getAllByTestId('option').length).toBe(1)
        expect(screen.getByText('Select a Project:')).toBeTruthy()
        const testProject = screen.getByText('TestProject')
        expect(testProject).toBeTruthy()
        fireEvent.change(select, { target: { value: '1' } })
    })
})
