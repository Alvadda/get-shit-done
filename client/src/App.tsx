import Login from './components/modules/Login'
import Main from './components/modules/Main'
import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useState, VFC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { login } from './utils/api'
import { GlobalStyle } from './utils/GlobalStyle'
import { theme } from './utils/Theme'
import TodoProvider from './context/TodoContext'

const AUTH_TOKEN = 'jwt_token'

const App: VFC = () => {
    const [auth, setAuth] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('')

    useEffect(() => {
        if (sessionStorage.getItem(AUTH_TOKEN)) setAuth(true)
    }, [])

    const onLogout = () => {
        sessionStorage.removeItem(AUTH_TOKEN)
        setAuth(false)
    }

    const onLogin = (email: string, password: string) => {
        login(email, password).then((data) => {
            if (data.token) {
                setUserName(data.userName)
                sessionStorage.setItem(AUTH_TOKEN, data.token)
                setAuth(true)
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                {!auth && (
                    <Switch>
                        <Route path="/">
                            <Login onLogin={onLogin} />
                        </Route>
                    </Switch>
                )}
                {auth && (
                    <>
                        <Switch>
                            <Route path="/" exact>
                                <TodoProvider>
                                    <Main onLogout={onLogout} userName={userName} />
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
