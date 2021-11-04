import { css } from '@emotion/react'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

type SendTodoParams = {
    guid: string
}

const SendTodoStyle = css`
    color: #fff;
`

const SendTodo = () => {
    const { guid } = useParams<SendTodoParams>()
    console.log(useLocation())

    return (
        <div css={SendTodoStyle}>
            <h3>SENDE JEMAND EIN TODO</h3>
            <h3>{guid}</h3>
        </div>
    )
}

export default SendTodo
