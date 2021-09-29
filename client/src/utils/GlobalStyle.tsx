import { Global, css } from '@emotion/react'
import React from 'react'

const globalStlye = css`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        box-sizing: content-box;
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        background-color: #2d2d34;

        h2 {
            margin: 0;
            padding: 0;
        }
    }
`
export const GlobalStyle = () => <Global styles={globalStlye} />
