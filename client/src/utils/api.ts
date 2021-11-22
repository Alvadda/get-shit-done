import { getAuthToken } from './sessionStoreManager'

export interface Todo {
    id?: string
    description: string
    done: boolean
    createdAt?: Date
    doneDate?: Date
    douDate: Date
    project?: Project
}

export interface Project {
    id: string
    name?: string
}

interface Login {
    token: string
    userName: string
}

const getHeader = (): object => ({
    'Content-Type': 'application/json',
    jwt_token: getAuthToken(),
})

const isDev = process.env.NODE_ENV === 'development'

const prefix = isDev ? '' : 'http://localhost:5000'

export const login = async (email: string, password: string): Promise<Login> => {
    const request = await fetch(`${prefix}/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    const data = await request.json()
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
}

export const readProjects = async (): Promise<Project[]> => {
    const request = await fetch(`${prefix}/projects`, {
        headers: {
            ...getHeader(),
        },
    })

    const data = await request.json()
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
}

export const createProject = async (name: string): Promise<Project[]> => {
    const response = await fetch(`${prefix}/projects`, {
        method: 'POST',
        headers: {
            ...getHeader(),
        },
        body: JSON.stringify({ name }),
    })

    const data = await response.json()
    if (data.errorMessage) throw new Error('data.errorMessage')
    return data
}

export const readTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${prefix}/todos`, {
        headers: {
            ...getHeader(),
        },
    })

    const data = await response.json()
    if (data.errorMessage) throw new Error('data.errorMessage')
    return data
}

export const deleteTodo = async (id: string): Promise<boolean> => {
    const request = await fetch(`${prefix}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            ...getHeader(),
        },
    })
    return request.ok
}

export const createTodo = async (todo: Todo): Promise<Todo[]> => {
    const request = await fetch(`${prefix}/todos`, {
        method: 'POST',
        headers: {
            ...getHeader(),
        },
        body: JSON.stringify(todo),
    })

    const data = await request.json()
    if (data.errorMessage) throw new Error('data.errorMessage')
    return data
}

export const updateTodo = async (todo: Todo): Promise<Todo[]> => {
    const request = await fetch(`${prefix}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            ...getHeader(),
        },
        body: JSON.stringify(todo),
    })

    const data = await request.json()
    if (data.errorMessage) throw new Error('data.errorMessage')
    return data
}

export const createSendTodoSession = async (todos?: number, days?: number): Promise<string> => {
    const request = await fetch(`${prefix}/sendtodo/?todos=${todos}&days=${days}`, {
        method: 'POST',
        headers: {
            ...getHeader(),
        },
    })
    const data = await request.json()

    if (data.errorMessage) throw new Error(data.errorMessage)
    return data.send_session_id
}

export const getIsSendTodoSessionValid = async (guid: string): Promise<string | ''> => {
    const request = await fetch(`${prefix}/sendtodo/isvalid/${guid}`, {
        method: 'GET',
        headers: {
            ...getHeader(),
        },
    })
    if (request.status !== 200) return ''
    const user = await request.json()
    return user.user
}

export const sendTodo = async (guid: string, todo: Todo): Promise<Todo[]> => {
    const request = await fetch(`${prefix}/sendtodo/${guid}`, {
        method: 'POST',
        headers: {
            ...getHeader(),
        },
        body: JSON.stringify(todo),
    })
    const data = await request.json()

    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
}
