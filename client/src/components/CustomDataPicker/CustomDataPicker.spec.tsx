import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import CustomDatePicker from './CustomDatePicker'

describe('TodoItem', () => {
    it('renders', () => {
        const date = new Date('12/12/2030')
        render(<CustomDatePicker date={date} setDate={() => {}} />)
        expect(screen.getByDisplayValue('12/12/2030')).toBeInTheDocument()
    })

    it('check date', () => {
        const date = new Date('12/12/2030')
        const setDate = jest.fn()
        render(<CustomDatePicker date={date} setDate={setDate} />)
        const input = screen.getByDisplayValue('12/12/2030')
        expect(input).toBeInTheDocument()
        fireEvent.change(input, { target: { value: '6/6/2069' } })
        expect(setDate.mock.calls.length).toBe(1)
    })
})
