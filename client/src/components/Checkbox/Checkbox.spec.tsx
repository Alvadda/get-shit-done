import React from 'react'
import { render, screen, userEvent } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import Checkbox from '../Checkbox/Checkbox'

describe('SelectProject', () => {
    it('renders', () => {
        render(<Checkbox onClick={() => {}} />)
        expect(screen.getByTestId('checkbox')).toBeInTheDocument()
    })

    it('check if on click gets called', () => {
        jest.useFakeTimers()
        const onClick = jest.fn()
        render(<Checkbox onClick={onClick} />)
        const checkbox = screen.getByTestId('checkbox')
        expect(checkbox).toBeInTheDocument()
        userEvent.click(checkbox)
        setTimeout(() => {
            expect(onClick.mock.calls.length).toBe(1)
        }, 650)
        jest.runAllTimers()
    })
})
