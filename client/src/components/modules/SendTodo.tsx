import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIsSendTodoSessionValid, sendTodo, Todo } from '../../utils/api'
import AddTodo from '../AddTodo/AddTodo'

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
    const [todoOwner, setTodoOwner] = useState<string>('')

    useEffect(() => {
        getIsSendTodoSessionValid(guid).then((isGuidValid) => setTodoOwner(isGuidValid))
    }, [guid])

    const onAddTodo = async (todo: Todo) => {
        const newTodo = await sendTodo(guid, todo)
        console.log('Todo Send', newTodo)
    }
    return (
        <div css={SendTodoStyle}>
            {todoOwner && (
                <>
                    <h3>ADD TODO FOR {todoOwner.toLocaleUpperCase()}</h3>
                    <AddTodo onAddTodo={onAddTodo} />
                </>
            )}
            {!todoOwner && (
                <>
                    <h3>LINK IS INVALID</h3>
                </>
            )}
        </div>
    )
}

export default SendTodo
