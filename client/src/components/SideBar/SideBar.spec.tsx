import React from 'react'
import { render, screen } from '../../utils/test-util'
import '@testing-library/jest-dom/extend-expect'

import SideBar from '../SideBar/SideBar'

describe('SideBar', () => {
    it('renders', () => {
        render(<SideBar />)
        expect(screen.getByRole('complementary')).toBeTruthy()
    })

    it('check default projects', () => {
        render(<SideBar />)
        expect(screen.getByText('Inbox')).toBeTruthy()
        expect(screen.getByText('DO NOW')).toBeTruthy()
        expect(screen.getByText('DO SOON')).toBeTruthy()
        expect(screen.getByTestId('inbox-number')).toHaveTextContent('1')
        expect(screen.getByTestId('do-now-number')).toHaveTextContent('1')
        expect(screen.getByTestId('do-soon-number')).toHaveTextContent('1')
    })

    it('check added project', () => {
        render(<SideBar />)
        expect(screen.getByText('Project 1')).toBeTruthy()
        expect(screen.getByTestId('Project 1-number')).toHaveTextContent('2')
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
