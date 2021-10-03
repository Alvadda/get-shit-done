import React, { VFC } from 'react'
import { css } from '@emotion/react'
import Checkbox from './Checkbox'

interface TodoItemProps {
    id?: string
    description: string
    douDate?: Date
    onDelete: Function
    onDone: Function
}

const todoItemStyle = css`
    display: flex;
    justify-content: space-between;
    padding: 24px 16px;
    /* background: white; */
    color: #fff;

    border-bottom: 2px solid #002848;

    .done-description {
        display: flex;
        gap: 20px;
    }
`

const TodoItem: VFC<TodoItemProps> = ({ id, description, douDate, onDelete, onDone }) => {
    return (
        <div css={todoItemStyle}>
            <div className="done-description">
                <Checkbox
                    onClick={() => {
                        onDone(id)
                    }}
                />
                <p>{description}</p>
                <p>{douDate}</p>
            </div>
            <button
                onClick={() => {
                    onDelete(id)
                }}
            >
                Delete
            </button>
        </div>
    )
}

export default TodoItem
