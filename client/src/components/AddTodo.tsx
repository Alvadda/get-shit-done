import { css } from '@emotion/react'
import React, { createRef, useState, VFC, FormEvent } from 'react'
import CostumDatePicker from './CustomDatePicker'
import { useAppContext } from '../context/AppContext'
import SelectProject from './SelectProject'
import { Project } from '../utils/api'

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
    const { state } = useAppContext()
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
        <div css={addTodoCss}>
            <form onSubmit={addTodo}>
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
                <input type="text" placeholder="Todo" ref={todoRef} />
                {showProjects && <SelectProject onSelect={onSelect} />}

                <CostumDatePicker date={douDate} setDate={setDouDate} />
            </form>
        </div>
    )
}

export default AddTodo
