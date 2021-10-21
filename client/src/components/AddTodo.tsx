import { css } from '@emotion/react'
import React, { createRef, useState, VFC, FormEvent } from 'react'
import CostumDatePicker from './CustomDatePicker'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useAppContext } from '../context/AppContext'

interface AddTodoProps {
    onAddTodo: Function
}

const addTodoCss = css`
    form {
        display: grid;
        grid-template-columns: 50px 1fr 1fr 1fr;
        gap: 12px;

        button {
            background-color: transparent;
            border: none;

            svg {
                stroke: #fff;
            }
        }
    }
`

const AddTodo: VFC<AddTodoProps> = ({ onAddTodo }) => {
    const { state } = useAppContext()
    const [douDate, setDouDate] = useState(new Date())

    const todoRef = createRef<HTMLInputElement>()
    const projectRef = createRef<HTMLSelectElement>()

    const addTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todoRef.current?.value) {
            onAddTodo({
                description: todoRef.current.value,
                douDate,
                done: false,
                projectId: projectRef.current?.value,
            })
        }
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
                <select ref={projectRef}>
                    <option value=""> Select a Project:</option>
                    {state.projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                {/* <Dropdown
                    options={options}
                    onChange={(value) => setProject(value.value)}
                    value={defaultOption}
                    placeholder="Select an option"
                /> */}
                <CostumDatePicker date={douDate} setDate={setDouDate} />
            </form>
        </div>
    )
}

export default AddTodo
