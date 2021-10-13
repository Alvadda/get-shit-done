import { Global, css } from '@emotion/react'

const globalStlye = css`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html {
        // 1rem = 10px | default ist 1rem 16px
        font-size: 62.5%;
    }

    body {
        background-color: #00162b;

        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
    }
`

export const GlobalStyle = () => <Global styles={globalStlye} />
