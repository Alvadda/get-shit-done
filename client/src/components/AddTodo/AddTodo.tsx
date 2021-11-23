import { css } from '@emotion/react'
import React, { createRef, useState, VFC, FormEvent } from 'react'
import CostumDatePicker from '../CustomDataPicker/CustomDatePicker'
import SelectProject from '../SelectProject/SelectProject'
import { Project } from '../../utils/api'
import Plus from '../../assets/Svg/Plus'

interface AddTodoProps {
    onAddTodo: Function
    showProjects?: boolean
}

const addTodoCss = css`
    form {
        display: grid;
        grid-template-columns: 50px 1fr 1fr 1fr;
        gap: 12px;

        button {
            background-color: transparent;
            border: none;

            cursor: pointer;
            transition: all 300ms;

            svg {
                stroke: #fff;
            }
            &:hover {
                opacity: 0.6;
            }
            &:active svg {
                stroke: #71e271;
            }
        }
    }
`

const AddTodo: VFC<AddTodoProps> = ({ onAddTodo, showProjects }) => {
    const [douDate, setDouDate] = useState(new Date())
    const [selectedProject, setSelectedProject] = useState<Project | {}>({})

    const todoRef = createRef<HTMLInputElement>()

    const addTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todoRef.current?.value) {
            onAddTodo({
                description: todoRef.current.value,
                douDate,
                done: false,
                project: {
                    ...selectedProject,
                },
            })
        }
    }

    const onSelect = (project: Project) => {
        setSelectedProject(project)
    }
    return (
        <div css={addTodoCss} data-testid="add-todo">
            <form onSubmit={addTodo}>
                <button data-testid="add-todo-button" type="submit">
                    <Plus />
                </button>
                <input data-testid="add-todo-description" type="text" placeholder="Todo" ref={todoRef} />
                {showProjects && <SelectProject onSelect={onSelect} />}
                <CostumDatePicker date={douDate} setDate={setDouDate} />
            </form>
        </div>
    )
}

export default AddTodo
