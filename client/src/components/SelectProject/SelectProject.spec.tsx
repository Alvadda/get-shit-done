import React from 'react'
import { render, screen } from '../../utils/test-util'

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
    })

    it('check on option select', () => {
        render(<SelectProject onSelect={() => {}} />)
        expect(screen.getByTestId('select')).toBeTruthy()
        expect(screen.getAllByTestId('option').length).toBe(1)
        expect(screen.getByText('Select a Project:')).toBeTruthy()
    })
})
