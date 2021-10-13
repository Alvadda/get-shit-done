import Login from './components/modules/Login'
import Main from './components/modules/Main'
import { ThemeProvider } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { login } from './utils/api'
import { GlobalStyle } from './utils/GlobalStyle'
import { theme } from './utils/Theme'
import TodoProvider from './context/TodoContext'
import { useUserContext } from './context/UserContext'

const AUTH_TOKEN = 'jwt_token'
const USER_NAME = 'user_name'

const App: VFC = () => {
    const { state, dispatch } = useUserContext()

    useEffect(() => {
        const authToken = sessionStorage.getItem(AUTH_TOKEN) || undefined
        if (!authToken) return

        dispatch({ type: 'LOGIN', user: { name: sessionStorage.getItem(USER_NAME) || '' }, authToken })
    }, [dispatch])

    const onLogout = () => {
        sessionStorage.removeItem(AUTH_TOKEN)
        sessionStorage.removeItem(USER_NAME)
        dispatch({ type: 'LOGOUT' })
    }

    const onLogin = (email: string, password: string) => {
        login(email, password).then((data) => {
            if (data.token) {
                sessionStorage.setItem(AUTH_TOKEN, data.token)
                sessionStorage.setItem(USER_NAME, data.userName)
                dispatch({ type: 'LOGIN', user: { name: data.userName }, authToken: data.token })
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                {!state.authToken && (
                    <Switch>
                        <Route path="/">
                            <Login onLogin={onLogin} />
                        </Route>
                    </Switch>
                )}
                {state.authToken && (
                    <>
                        <Switch>
                            <Route path="/" exact>
                                <TodoProvider>
                                    <Main onLogout={onLogout} userName={state.user?.name || ''} />
                                </TodoProvider>
                            </Route>
                        </Switch>
                    </>
                )}
            </Router>
        </ThemeProvider>
    )
}

export default App
