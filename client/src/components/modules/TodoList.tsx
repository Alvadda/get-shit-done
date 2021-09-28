import { css } from '@emotion/react'
import React, { useState, useEffect, createRef, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo } from '../../utils/api'
import TodoItem from '../TodoItem'

const todoListCss = css`
    .todo-list-container {
        display: flex;
        flex-direction: column;
        gap: 8px;

        div:nth-child(odd) {
            background-color: hotpink;
        }
        div:nth-child(even) {
            background-color: goldenrod;
        }
    }
`

const TodoList: VFC = () => {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const inputRef = createRef<HTMLInputElement>()
    console.log(todoList)
    useEffect(() => {
        readTodos().then((todos) => {
            setTodoList(todos)
        })
    }, [])

    const onDelete = (id: string) => {
        todoList.filter((todo) => todo.id !== id)
        setTodoList(todoList.filter((todo) => todo.id !== id))
        deleteTodo(id)
    }

    const onAddTodo = () => {
        if (inputRef.current?.value) {
            const todo: Todo = {
                description: inputRef.current?.value,
            }
            createTodo(todo).then((todo) => {
                console.log(todo)
                setTodoList([...todoList, ...todo])
            })
        }
    }

    return (
        <div css={todoListCss}>
            <div>
                <input type="text" name="" id="" ref={inputRef} />
                <button onClick={() => onAddTodo()}>ADD Todo</button>
            </div>
            <div className="todo-list-container">
                {todoList.map((todo) => (
                    <TodoItem key={todo.id} id={todo.id} onDelete={onDelete} description={todo.description} />
                ))}
            </div>
        </div>
    )
}

export default TodoList
