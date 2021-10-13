import { css } from '@emotion/react'
import React, { createRef, useState, VFC, FormEvent } from 'react'
import CostumDatePicker from './CustomDatePicker'

interface TodoGeneraterProps {
    onAddTodo: Function
}

const todoGeneraterCss = css`
    form {
        display: flex;
    }
`

const TodoGenerater: VFC<TodoGeneraterProps> = ({ onAddTodo }) => {
    const [douDate, setDouDate] = useState(new Date())
    const inputRef = createRef<HTMLInputElement>()

    const generateTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current?.value) {
            onAddTodo({
                description: inputRef.current?.value,
                douDate,
                done: false,
            })
        }
    }

    return (
        <div css={todoGeneraterCss}>
            <form onSubmit={generateTodo}>
                <input type="text" name="" id="" ref={inputRef} />
                <CostumDatePicker date={douDate} setDate={setDouDate} />
                <button type="submit">ADD Todo</button>
            </form>
        </div>
    )
}

export default TodoGenerater
