import { css } from '@emotion/react'
import React, { VFC } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import TodoList from '../TodoList'

interface MainProps {
    onLogout: () => void
    userName: string
}

const mainCss = css`
    display: grid;

    height: 100vh;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 15% 1fr 15%;
`

const Main: VFC<MainProps> = ({ onLogout, userName }) => {
    return (
        <main css={mainCss}>
            <Header onLogout={onLogout} userName={userName} />
            <SideBar />
            <TodoList />
        </main>
    )
}

export default Main
