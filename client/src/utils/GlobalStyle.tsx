import { Global, css } from '@emotion/react'
import React from 'react'

const globalStlye = css`
    body {
        box-sizing: content-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #36393b;

        h2 {
            margin: 0;
            padding: 0;
        }
    }
`
export const GlobalStyle = () => <Global styles={globalStlye} />
