import { useAppContext } from '../context/AppContext'
import { ProjectTypes } from '../types/appContext.types'
import { isDateWithinOneWeekRange, isSameDay } from '../utils/helper'

export const useAppSelector = () => {
    const { state } = useAppContext()
    if (!state) throw new Error('useAppSelector must be in app context')

    const selectTodosInbox = state.todos.filter((todo) => !todo.done && !Boolean(todo.project?.id))

    const selectTodosNow = state.todos.filter((todo) => {
        if (!todo.douDate) return false
        return !todo.done && isSameDay(new Date(todo.douDate), new Date())
    })

    const selectTodosSoon = state.todos.filter((todo) => {
        if (!todo.douDate) return false
        return !todo.done && isDateWithinOneWeekRange(new Date(todo.douDate))
    })

    const selectTodosFromProject = (projectId: string) => {
        return state.todos.filter((todo) => !todo.done && todo.project?.id === projectId)
    }

    const selectTodosToSelectedProject = () => {
        switch (state.selectedProjectType) {
            case ProjectTypes.Inbox:
                return selectTodosInbox
            case ProjectTypes.DoNow:
                return selectTodosNow
            case ProjectTypes.DoSoon:
                return selectTodosSoon
            case ProjectTypes.Id:
                return state.selectedProject ? selectTodosFromProject(state.selectedProject) : []
        }
    }

    return {
        selectTodosInbox,
        selectTodosNow,
        selectTodosSoon,
        selectTodosFromProject,
        selectTodosToSelectedProject,
    }
}
