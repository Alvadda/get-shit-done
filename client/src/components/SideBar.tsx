import { css } from '@emotion/react'
import React, { VFC } from 'react'

interface SideBarProps {}

const sideBarCss = css`
    width: 100%;
    border-right: 2px solid #002848;
    color: #fff;
    padding: 16px 24px;
`

const SideBar: VFC<SideBarProps> = () => {
    return <div css={sideBarCss}>Sidebar</div>
}

export default SideBar
