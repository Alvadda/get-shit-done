import React, { useEffect, useState, VFC } from 'react'
import { GlobalStyle } from './utils/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TodoList from './components/modules/TodoList'
import Login from './components/modules/Login'
import { login } from './utils/api'

const AUTH_TOKEN = 'auth-token'

const App: VFC = () => {
    const [auth, setAuth] = useState<boolean>(false)

    const onLogin = (email: string, password: string) => {
        login(email, password).then((data) => {
            if (data.token) {
                localStorage.setItem(AUTH_TOKEN, data.token)
                setAuth(true)
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN)) setAuth(true)
    }, [])

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
                                <TodoList />
                            </Route>
                        </Switch>
                    </>
                )}
            </Router>
        </>
    )
}

export default App
