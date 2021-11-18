import { Project, Todo } from '../utils/api'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

export const initTodos: Todo[] = [
    {
        id: '1',
        description: 'inbox',
        done: false,
        douDate: new Date('December 17, 2130'),
    },
    {
        id: '2',
        description: 'do now',
        done: false,
        douDate: new Date(),
        project: {
            id: '1',
            name: 'Project 1',
        },
    },
    {
        id: '3',
        description: 'do soon',
        done: false,
        douDate: tomorrow,
        project: {
            id: '1',
            name: 'Project 1',
        },
    },
    {
        id: '2',
        description: 'do now',
        done: true,
        douDate: new Date(),
        project: {
            id: '1',
            name: 'Project 1',
        },
    },
]

export const initProjects: Project[] = [
    {
        id: '1',
        name: 'Project 1',
    },
]
