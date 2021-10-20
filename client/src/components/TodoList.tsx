import { css } from '@emotion/react'
import React, { useEffect, VFC } from 'react'
import { readTodos, deleteTodo, createTodo, Todo, updateTodo } from '../utils/api'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import { useAppContext } from '../context/AppContext'
import { ProjectTypes } from '../types/appContext.types'
import { isDateWithinOneWeekRange, isSameDay } from '../utils/helper'

const todoListCss = css`
    padding: 20px 32px;
    .todo-list-container {
        display: flex;
        flex-direction: column;
    }
`

const TodoList: VFC = () => {
    const { state, dispatch } = useAppContext()
    console.log(state.todos)
    console.log('state: ', state)
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

    const onAddTodo = (todo: Todo) => {
        createTodo(todo).then((todos) => {
            dispatch({ type: 'ADD_TODO', todos })
        })
    }

    const showTodosToSelectedProject = (todo: Todo) => {
        if (todo.done) return false

        switch (state.selectedProjectType) {
            case ProjectTypes.Inbox:
                return todo.projectId === null
            case ProjectTypes.DoNow:
                if (!todo.douDate) return false
                return isSameDay(new Date(todo.douDate), new Date())
            case ProjectTypes.DoSoon:
                if (!todo.douDate) return false
                return isDateWithinOneWeekRange(new Date(todo.douDate))
            case ProjectTypes.Id:
                return todo.projectId === state.selectedProject
        }
    }

    return (
        <div css={todoListCss}>
            <AddTodo onAddTodo={onAddTodo} />
            <div className="todo-list-container">
                {state.todos
                    .filter((todo) => showTodosToSelectedProject(todo))
                    .map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            onDelete={onDelete}
                            onDone={onDone}
                            description={todo.description}
                            douDate={todo.douDate}
                            projectId={todo.projectId}
                        />
                    ))}
            </div>
        </div>
    )
}

export default TodoList
