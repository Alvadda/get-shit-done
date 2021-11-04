import React, { VFC } from 'react'
import { css } from '@emotion/react'
import Checkbox from './Checkbox'
import { getDDMMYYYY } from '../utils/helper'

interface TodoItemProps {
    id?: string
    description: string
    douDate?: Date
    projectName?: string
    onDelete: Function
    onDone: Function
}

const todoItemStyle = css`
    display: grid;
    grid-template-columns: auto 60% 1fr 1fr 50px;
    column-gap: 12px;
    padding: 24px 16px;
    /* background: white; */
    color: #fff;

    border-bottom: 2px solid #002848;

    .description {
        overflow: hidden;
    }
`

const TodoItem: VFC<TodoItemProps> = ({ id, description, projectName, douDate, onDelete, onDone }) => {
    return (
        <div css={todoItemStyle}>
            <Checkbox
                onClick={() => {
                    onDone(id)
                }}
            />
            <p className="description">{description}</p>
            <p>{projectName}</p>
            <p>{douDate && getDDMMYYYY(new Date(douDate))}</p>
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
