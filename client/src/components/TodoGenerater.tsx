import React, { createRef, useState, VFC } from 'react'
import { Todo } from '../utils/api'
import CostumDatePicker from './CustomDatePicker'

interface TodoGeneraterProps {
    onAddTodo: Function
}

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
        <div>
            <input type="text" name="" id="" ref={inputRef} />
            <CostumDatePicker date={douDate} setDate={setDouDate} />
            <button onClick={() => generateTodo()}>ADD Todo</button>
        </div>
    )
}

export default TodoGenerater
