import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIsSendTodoSessionValid, sendTodo, Todo } from '../utils/api'
import AddTodo from '../components/AddTodo/AddTodo'

type SendTodoParams = {
    guid: string
}

interface SendTodoState {
    user?: string
    todosLeft: number
    errorMessage?: string
}

const SendTodoStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding-top: 5rem;

    color: #fff;

    .error-message {
        color: red;
    }
`

const SendTodo = () => {
    const { guid } = useParams<SendTodoParams>()
    const [state, setState] = useState<SendTodoState>({ todosLeft: 0 })

    useEffect(() => {
        const isSessionValid = async () => {
            try {
                const { user, todosLeft } = await getIsSendTodoSessionValid(guid)
                setState({ user, todosLeft })
            } catch (error: any) {
                setState({ todosLeft: 0, errorMessage: error.message })
            }
        }
        isSessionValid()
    }, [guid])

    const onAddTodo = async (todo: Todo) => {
        try {
            const newTodo = await sendTodo(guid, todo)
            setState({ ...state, errorMessage: undefined, todosLeft: state.todosLeft - 1 })
        } catch (error: any) {
            setState({ ...state, errorMessage: error.message })
        }
    }
    return (
        <div css={SendTodoStyle}>
            {state.user && (
                <>
                    <h3>ADD TODO FOR {state.user.toLocaleUpperCase()}</h3>
                    <AddTodo onAddTodo={onAddTodo} />
                    <p className="todos-left">{state.todosLeft}</p>
                </>
            )}
            {!state.user && (
                <>
                    <h3>LINK IS INVALID</h3>
                </>
            )}
            {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
        </div>
    )
}

export default SendTodo
