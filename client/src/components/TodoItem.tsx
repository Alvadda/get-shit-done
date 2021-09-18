import React, { VFC } from 'react'
import { css } from '@emotion/react'

interface TodoItemProps {
    id?: string
    description: string
    onDelete: Function
}

const todoItemStyle = css`
    background: white;
`

const TodoItem: VFC<TodoItemProps> = ({ id, description, onDelete }) => {
    return (
        <div css={todoItemStyle}>
            <p>{description}</p>
            <button
                onClick={() => {
                    onDelete(id)
                }}
            >
                Click me
            </button>
        </div>
    )
}

export default TodoItem
