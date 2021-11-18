import Login from './pages/Login'
import Main from './pages/Main'
import { ThemeProvider } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { login } from './utils/api'
import { GlobalStyle } from './utils/GlobalStyle'
import { theme } from './utils/Theme'
import AppProvider from './context/AppContext'
import { useUserContext } from './context/UserContext'
import { getAuthToken, getUserName, removeAuthToken, removeUserName, setAuthToken, setUserName } from './utils/sessionStoreManager'
import SendTodo from './pages/SendTodo'

const App: VFC = () => {
    const { state, dispatch } = useUserContext()

    useEffect(() => {
        const authToken = getAuthToken()
        if (!authToken) return

        dispatch({ type: 'LOGIN', user: { name: getUserName() || '' }, authToken })
    }, [dispatch])

    const onLogout = () => {
        removeUserName()
        removeAuthToken()
        dispatch({ type: 'LOGOUT' })
    }

    const onLogin = (email: string, password: string) => {
        login(email, password).then((data) => {
            if (data.token) {
                setUserName(data.userName)
                setAuthToken(data.token)
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
                        <Route path="/:guid">
                            <SendTodo />
                        </Route>
                        <Route path="/">
                            <Login onLogin={onLogin} />
                        </Route>
                    </Switch>
                )}
                {state.authToken && (
                    <>
                        <Switch>
                            <Route path="/" exact>
                                <AppProvider>
                                    <Main onLogout={onLogout} userName={state.user?.name || ''} />
                                </AppProvider>
                            </Route>
                        </Switch>
                    </>
                )}
            </Router>
        </ThemeProvider>
    )
}

export default App
