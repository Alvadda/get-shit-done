import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyle'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Theme'
import AppProvider from '../context/AppContext'

const AllTheProviders: FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <AppProvider>{children}</AppProvider>
            </Router>
        </ThemeProvider>
    )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { userEvent, customRender as render }
