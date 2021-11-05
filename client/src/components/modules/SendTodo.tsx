import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIsSendTodoSessionValid } from '../../utils/api'

type SendTodoParams = {
    guid: string
}

const SendTodoStyle = css`
    color: #fff;
`

const SendTodo = () => {
    const { guid } = useParams<SendTodoParams>()
    const [isValid, setIsValid] = useState<Boolean>(false)

    useEffect(() => {
        getIsSendTodoSessionValid(guid).then((isGuidValid) => setIsValid(isGuidValid))
    }, [guid])

    return (
        <div css={SendTodoStyle}>
            {isValid && (
                <>
                    <h3>SENDE JEMAND EIN TODO</h3>
                    <h3>{guid}</h3>
                </>
            )}
        </div>
    )
}

export default SendTodo
