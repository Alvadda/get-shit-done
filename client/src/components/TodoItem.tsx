import React, { VFC } from 'react'
import { css } from '@emotion/react'

interface TodoItemProps {
    id?: string
    description: string
    onDelete: Function
    onDone: Function
}

const todoItemStyle = css`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background: white;
`

const TodoItem: VFC<TodoItemProps> = ({ id, description, onDelete, onDone }) => {
    return (
        <div css={todoItemStyle}>
            <p>{description}</p>
            <button
                onClick={() => {
                    onDelete(id)
                }}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    onDone(id)
                }}
            >
                Done
            </button>
        </div>
    )
}

export default TodoItem
