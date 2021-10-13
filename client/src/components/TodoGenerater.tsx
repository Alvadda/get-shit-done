import { css } from '@emotion/react'
import React, { createRef, useState, VFC } from 'react'
import CostumDatePicker from './CustomDatePicker'

interface TodoGeneraterProps {
    onAddTodo: Function
}

const todoGeneraterCss = css`
    display: flex;
`

const TodoGenerater: VFC<TodoGeneraterProps> = ({ onAddTodo }) => {
    const [douDate, setDouDate] = useState(new Date())
    const inputRef = createRef<HTMLInputElement>()

    const generateTodo = () => {
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
            <input type="text" name="" id="" ref={inputRef} />
            <CostumDatePicker date={douDate} setDate={setDouDate} />
            <button onClick={() => generateTodo()}>ADD Todo</button>
        </div>
    )
}

export default TodoGenerater
