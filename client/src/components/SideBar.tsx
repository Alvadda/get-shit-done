import { css } from '@emotion/react'
import React, { VFC } from 'react'

interface SideBarProps {}

const sideBarCss = css`
    width: 100%;
    background-color: #063861;
    color: #fff;
    padding: 16px 24px;
`

const SideBar: VFC<SideBarProps> = () => {
    return <div css={sideBarCss}>Sidebar</div>
}

export default SideBar
