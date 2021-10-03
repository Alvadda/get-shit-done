import { css } from '@emotion/react'
import React, { useState, useEffect, createRef, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo, updateTodo } from '../utils/api'
import TodoItem from './TodoItem'
import CostumDatePicker from './CustomDatePicker'
import TodoGenerater from './TodoGenerater'

const todoListCss = css`
    padding: 20px 32px;
    .todo-list-container {
        display: flex;
        flex-direction: column;
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

    const onAddTodo = (todo: Todo) => {
        createTodo(todo).then((todo) => {
            setTodoList([...todo, ...todoList])
        })
    }

    const removeTodoFromList = (id: string) => {
        todoList.filter((todo) => todo.id !== id)
        setTodoList(todoList.filter((todo) => todo.id !== id))
    }

    return (
        <div css={todoListCss}>
            <TodoGenerater onAddTodo={onAddTodo} />
            <div className="todo-list-container">
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        onDelete={onDelete}
                        onDone={onDone}
                        description={todo.description}
                        douDate={todo.douDate}
                    />
                ))}
            </div>
        </div>
    )
}

export default TodoList
