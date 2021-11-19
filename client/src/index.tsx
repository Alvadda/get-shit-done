import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserProvider from './context/UserContext'

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./__mock__/msw/browser.ts')
    worker.start()
}

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
