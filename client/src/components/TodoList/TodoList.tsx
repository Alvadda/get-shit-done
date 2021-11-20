import { css } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo, updateTodo } from '../../utils/api'
import TodoItem from '../TodoItem/TodoItem'
import AddTodo from '../AddTodo/AddTodo'
import { useAppContext } from '../../context/AppContext'
import { ProjectTypes } from '../../types/appContext.types'
import { isDateWithinOneWeekRange, isSameDay } from '../../utils/helper'
import { useAppSelector } from '../../hooks/useAppSelector'

const todoListCss = css`
    padding: 20px 32px;
    height: calc(100vh - 50px);
    .todo-list-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
    }
`

const TodoList: VFC = () => {
    const { state, dispatch } = useAppContext()
    const { selectTodoToSelectedProject } = useAppSelector()

    useEffect(() => {
        readTodos().then((todos) => {
            dispatch({ type: 'SET_TODOS', todos })
        })
    }, [dispatch])

    const onDelete = (id: string) => {
        dispatch({ type: 'DELETE_TODO', id })
        deleteTodo(id)
    }

    const onDone = (id: string) => {
        const todo = state.todos.find((todo) => todo.id === id)
        if (todo) {
            todo.done = true
            dispatch({ type: 'UPDATE_TODO', todo })
            updateTodo(todo)
        }
    }

    const onUpdate = (todo: Todo) => {
        dispatch({ type: 'UPDATE_TODO', todo })
        updateTodo(todo)
    }

    const onAddTodo = (todo: Todo) => {
        createTodo(todo).then((todos) => {
            dispatch({ type: 'ADD_TODO', todos })
        })
    }

    return (
        <div css={todoListCss} data-testid="todo-list">
            <AddTodo onAddTodo={onAddTodo} showProjects />
            <div className="todo-list-container">
                {selectTodoToSelectedProject().map((todo) => (
                    <TodoItem key={todo.id} id={todo.id} todo={todo} onDelete={onDelete} onDone={onDone} onUpdate={onUpdate} />
                ))}
            </div>
        </div>
    )
}

export default TodoList
