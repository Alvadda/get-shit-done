import { css } from '@emotion/react'
import React, { VFC } from 'react'
import Header from './Header'
import TodoList from './TodoList'

interface MainProps {
    onLogout: () => void
}

const mainCss = css`
    display: grid;

    height: 100vh;
    grid-template-rows: 50px 1fr;
`

const Main: VFC<MainProps> = ({ onLogout }) => {
    return (
        <div css={mainCss}>
            <Header onLogout={onLogout} />
            <TodoList />
        </div>
    )
}

export default Main
