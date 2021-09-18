import React, { VFC } from 'react'
import { GlobalStyle } from './utils/GlobalStyle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TodoList from './components/modules/TodoList'

const App: VFC = () => {
    const auth: boolean = true

    return (
        <>
            <GlobalStyle />
            <Router>
                {!auth && (
                    <Switch>
                        <Route path="/">
                            {/* TODO <Login onLogin={login} /> */}
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
