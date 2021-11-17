import React from 'react'
import { render, screen } from '../../utils/test-util'

import SideBar from '../SideBar/SideBar'

describe('SideBar', () => {
    it('renders', () => {
        render(<SideBar />)
        expect(screen.getByRole('complementary')).toBeTruthy()
    })

    it('check default projects', () => {
        render(<SideBar />)
        expect(screen.getByText('Inbox 0')).toBeTruthy()
        expect(screen.getByText('DO NOW 0')).toBeTruthy()
        expect(screen.getByText('DO SOON 0')).toBeTruthy()
    })

    it('check add projects', () => {
        render(<SideBar />)
        expect(screen.getByTestId('add-project')).toBeTruthy()
        expect(screen.getByPlaceholderText('new Project')).toBeTruthy()
    })

    it('check get link', () => {
        render(<SideBar />)
        expect(screen.getByTestId('get-link')).toBeTruthy()
        expect(screen.getByPlaceholderText('Link')).toBeTruthy()
    })

    it('check Buttons', () => {
        render(<SideBar />)
        expect(screen.getAllByRole('button').length).toBe(2)
    })
})
