import { css } from '@emotion/react'
import React, { useState, useEffect, createRef, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo, updateTodo } from '../../utils/api'
import TodoItem from '../TodoItem'

const todoListCss = css`
    .todo-list-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 20px 70px;

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
        removeTodoFromList(id)
        deleteTodo(id)
    }

    const onDone = (id: string) => {
        const todo = todoList.find((todo) => todo.id === id)
        if (todo) {
            todo.done = true
            removeTodoFromList(id)
            updateTodo(todo)
        }
        console.log('todo', todo)
    }

    const onAddTodo = () => {
        if (inputRef.current?.value) {
            const todo: Todo = {
                description: inputRef.current?.value,
                done: false,
            }
            createTodo(todo).then((todo) => {
                setTodoList([...todo, ...todoList])
            })
        }
    }

    const removeTodoFromList = (id: string) => {
        todoList.filter((todo) => todo.id !== id)
        setTodoList(todoList.filter((todo) => todo.id !== id))
    }

    return (
        <div css={todoListCss}>
            <div>
                <input type="text" name="" id="" ref={inputRef} />
                <button onClick={() => onAddTodo()}>ADD Todo</button>
            </div>
            <div className="todo-list-container">
                {todoList.map((todo) => (
                    <TodoItem key={todo.id} id={todo.id} onDelete={onDelete} onDone={onDone} description={todo.description} />
                ))}
            </div>
        </div>
    )
}

export default TodoList
