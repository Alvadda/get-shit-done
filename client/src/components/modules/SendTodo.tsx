import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIsSendTodoSessionValid, sendTodo, Todo } from '../../utils/api'
import AddTodo from '../AddTodo'

type SendTodoParams = {
    guid: string
}

const SendTodoStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding-top: 5rem;

    color: #fff;
`

const SendTodo = () => {
    const { guid } = useParams<SendTodoParams>()
    const [isValid, setIsValid] = useState<Boolean>(false)

    useEffect(() => {
        getIsSendTodoSessionValid(guid).then((isGuidValid) => setIsValid(isGuidValid))
    }, [guid])

    const onAddTodo = async (todo: Todo) => {
        const newTodo = await sendTodo(guid, todo)
        console.log('Todo Send', newTodo)
    }
    return (
        <div css={SendTodoStyle}>
            {isValid && (
                <>
                    <h3>LINK IS VALID</h3>
                    <AddTodo onAddTodo={onAddTodo} />
                </>
            )}
            {!isValid && (
                <>
                    <h3>LINK IS INVALID</h3>
                </>
            )}
        </div>
    )
}

export default SendTodo
