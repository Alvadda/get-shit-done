import { css } from '@emotion/react'
import React, { createRef, useState, VFC, FormEvent } from 'react'
import CostumDatePicker from './CustomDatePicker'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useTodoContext } from '../context/TodoContext'

interface AddTodoProps {
    onAddTodo: Function
}

const addTodoCss = css`
    form {
        display: grid;
        grid-template-columns: 50px 1fr 1fr 1fr;
        gap: 12px;
    }
`

const AddTodo: VFC<AddTodoProps> = ({ onAddTodo }) => {
    const { state } = useTodoContext()
    const [douDate, setDouDate] = useState(new Date())
    const [project, setProject] = useState<String>('')

    const todoRef = createRef<HTMLInputElement>()

    const options = state.projects.map((project) => ({
        value: project.id || '',
        label: project.name || '',
    }))
    const defaultOption = options[0]

    console.log(project)
    const addTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todoRef.current?.value) {
            onAddTodo({
                description: todoRef.current?.value,
                douDate,
                done: false,
                projectId: project,
            })
        }
    }

    return (
        <div css={addTodoCss}>
            <form onSubmit={addTodo}>
                <button type="submit">ADD Todo</button>
                <input type="text" placeholder="Todo" ref={todoRef} />
                <Dropdown
                    options={options}
                    onChange={(value) => setProject(value.value)}
                    value={defaultOption}
                    placeholder="Select an option"
                />
                ;
                <CostumDatePicker date={douDate} setDate={setDouDate} />
            </form>
        </div>
    )
}

export default AddTodo
