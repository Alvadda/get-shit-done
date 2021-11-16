import React from 'react'
import { render, screen, userEvent } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import Header from '../Header/Header'

describe('SelectProject', () => {
    it('renders', () => {
        render(<Header onLogout={() => {}} userName="test" />)
        expect(screen.getByText('test')).toHaveTextContent('test')
    })

    it('logout called', () => {
        const logout = jest.fn()
        render(<Header onLogout={logout} userName="test" />)
        const logoutDiv = screen.getByTestId('logout')
        expect(logoutDiv).toBeTruthy()
        userEvent.click(logoutDiv)
        expect(logout.mock.calls.length).toBe(1)
    })
})
