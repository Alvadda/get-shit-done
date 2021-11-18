import { css } from '@emotion/react'
import React, { VFC } from 'react'
import Header from '../components/Header/Header'
import SideBar from '../components/SideBar/SideBar'
import TodoList from '../components/TodoList/TodoList'

interface MainProps {
    onLogout: () => void
    userName: string
}

const mainCss = css`
    display: grid;

    height: 100vh;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 15% 1fr 10%;

    overflow: hidden;
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
