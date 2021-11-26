import Login from './pages/Login'
import Main from './pages/Main'
import { ThemeProvider } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login as ILogin, login, register } from './utils/api'
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

    const onloginSuccess = (login: ILogin) => {
        setUserName(login.userName)
        setAuthToken(login.token)
        dispatch({ type: 'LOGIN', user: { name: login.userName }, authToken: login.token })
    }
    const onLogin = async (email: string, password: string) => {
        try {
            const loginSucress = await login(email, password)
            onloginSuccess(loginSucress)
        } catch (error: any) {
            dispatch({ type: 'ERROR', message: error.message })
        }
    }

    const onRegister = async (name: string, email: string, password: string) => {
        try {
            const registerSuccess = await register(name, email, password)
            onloginSuccess(registerSuccess)
        } catch (error: any) {
            await dispatch({ type: 'ERROR', message: error.message })
            console.log(state.errorMessage)
        }
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
                            <Login onLogin={onLogin} onRegister={onRegister} error={state.errorMessage} />
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
