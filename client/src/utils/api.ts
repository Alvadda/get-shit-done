import { getAuthToken } from './sessionStoreManager'

export interface Todo {
    id?: string
    description: string
    done: boolean
    createdAt?: Date
    doneDate?: Date
    douDate?: Date
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

const prefix = 'http://localhost:5000'

export const login = async (email: string, password: string): Promise<Login> =>
    new Promise((resolve, reject) => {
        const request = fetch(`${prefix}/auth/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    console.log(data.errorMessage)
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

export const readProjects = async (): Promise<Project[]> =>
    new Promise((resolve, reject) => {
        const request = fetch(`${prefix}/Projects`, {
            headers: {
                ...getHeader(),
            },
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

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

export const readTodos = async (): Promise<Todo[]> =>
    new Promise((resolve, reject) => {
        const request = fetch(`${prefix}/todos`, {
            headers: {
                ...getHeader(),
            },
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

export const deleteTodo = async (id: string): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`${prefix}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                ...getHeader(),
            },
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

export const createTodo = async (todo: Todo): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`${prefix}/todos`, {
            method: 'POST',
            headers: {
                ...getHeader(),
            },
            body: JSON.stringify(todo),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

export const updateTodo = async (todo: Todo): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`${prefix}/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                ...getHeader(),
            },
            body: JSON.stringify(todo),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.errorMessage) {
                    reject(data.errorMessage)
                }
                resolve(data)
            })
        )
    })

export const createSendTodoSession = async (): Promise<string> => {
    const request = await fetch(`${prefix}/sendtodo`, {
        method: 'POST',
        headers: {
            ...getHeader(),
        },
    })
    const data = await request.json()

    if (data.errorMessage) throw new Error(data.errorMessage)
    return data.send_session_id
}

export const getIsSendTodoSessionValid = async (guid: string): Promise<boolean> => {
    const request = await fetch(`${prefix}/sendtodo/isvalid/${guid}`, {
        method: 'GET',
        headers: {
            ...getHeader(),
        },
    })
    return request.status === 200
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
