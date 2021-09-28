import { css } from '@emotion/react'
import React, { VFC } from 'react'
import Header from './Header'
import TodoList from './TodoList'

interface MainProps {
    onLogout: () => void
    userName: string
}

const mainCss = css`
    display: grid;

    height: 100vh;
    grid-template-rows: 50px 1fr;
`

const Main: VFC<MainProps> = ({ onLogout, userName }) => {
    return (
        <div css={mainCss}>
            <Header onLogout={onLogout} userName={userName} />
            <TodoList />
        </div>
    )
}

export default Main
