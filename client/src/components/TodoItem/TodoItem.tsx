import { VFC } from 'react'
import { css } from '@emotion/react'
import Checkbox from '../Checkbox/Checkbox'
import { getDDMMYYYY } from '../../utils/helper'
import SelectProject from '../SelectProject/SelectProject'
import { Project, Todo } from '../../utils/api'
import { theme } from '../../utils/Theme'

interface TodoItemProps {
    id?: string
    todo: Todo
    onDelete: Function
    onDone: Function
    onUpdate: (Todo: Todo) => void
}

const todoItemStyle = css`
    display: grid;
    grid-template-columns: auto 60% 1fr 1fr auto;
    column-gap: 12px;
    padding: 24px 16px;
    /* background: white; */
    color: #fff;
    align-items: center;

    border-bottom: 2px solid #002848;

    .description {
        overflow: hidden;
    }

    button {
        cursor: pointer;
    }
    button,
    select {
        padding: ${theme.spacing['0-8']} ${theme.spacing['1-6']};

        background: #ffffff;

        border-radius: ${theme.borderRadius[1]};
        border-radius: ${theme.borderRadius['0-8']};
        border: none;

        font-size: ${theme.fontSize['1-2']};
    }
`

const TodoItem: VFC<TodoItemProps> = ({ todo, onDelete, onDone, onUpdate }) => {
    const onSelect = (project: Project) => {
        onUpdate({
            ...todo,
            project,
        })
    }

    return (
        <div css={todoItemStyle} data-testid="todo-item">
            <Checkbox
                onClick={() => {
                    onDone(todo.id)
                }}
            />
            <p className="description">{todo.description}</p>
            {Boolean(todo.project?.name) && <p>{todo.project?.name}</p>}
            {!Boolean(todo.project?.name) && <SelectProject onSelect={onSelect} />}
            <p>{getDDMMYYYY(new Date(todo.douDate))}</p>
            <button
                data-testid="todo-item-delete"
                onClick={() => {
                    onDelete(todo.id)
                }}
            >
                Delete
            </button>
        </div>
    )
}

export default TodoItem
