import { css } from '@emotion/react'
import React, { VFC } from 'react'

interface HeaderProps {
    onLogout: () => void
    userName: string
}

const headerCss = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 24px;
    grid-row: 1;
    grid-column: 1 / -1;
    background-color: #f4f9fe;
    color: #00162b;

    p {
        font-size: 24px;
        font-weight: bold;
    }

    svg:hover {
        opacity: 0.7;
        stroke: #00162b;
    }
`

const Header: VFC<HeaderProps> = ({ onLogout, userName }) => {
    return (
        <header css={headerCss}>
            <p data-testid="user-name">{userName}</p>
            <div data-testid="logout" onClick={() => onLogout()}>
                <svg
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="title"
                    aria-describedby="desc"
                    role="img"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    height="30px"
                    className="logout"
                >
                    <title>Export</title>
                    <desc>A line styled icon from Orion Icon Library.</desc>
                    <path
                        d="M34 22V6H2v52h32V42"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        stroke="#00162b"
                        fill="none"
                        data-name="layer2"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M14 32h47M48 43l13-11-13-11"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        stroke="#00162b"
                        fill="none"
                        data-name="layer1"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            </div>
        </header>
    )
}

export default Header
