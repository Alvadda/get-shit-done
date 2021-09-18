import React, { useState, useEffect, createRef, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo } from '../../utils/api'
import TodoItem from '../TodoItem'

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
        <div>
            <div>
                <input type="text" name="" id="" ref={inputRef} />
                <button onClick={() => onAddTodo()}>ADD Todo</button>
            </div>
            {todoList.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} onDelete={onDelete} description={todo.description} />
            ))}
        </div>
    )
}

export default TodoList
