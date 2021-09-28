import React, { useEffect, useState, VFC } from 'react'
import { GlobalStyle } from './utils/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/modules/Login'
import { login } from './utils/api'
import Main from './components/modules/Main'

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
        <>
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
                                <Main onLogout={onLogout} userName={userName} />
                            </Route>
                        </Switch>
                    </>
                )}
            </Router>
        </>
    )
}

export default App
