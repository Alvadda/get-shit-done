const AUTH_TOKEN = 'jwt_token'

export interface Todo {
    id?: string
    description: string
    done: boolean
    createdAt?: Date
    doneDate?: Date
}

interface Login {
    token: string
    userName: string
}

const getHeader = (): object => ({
    'Content-Type': 'application/json',
    [AUTH_TOKEN]: sessionStorage.getItem(AUTH_TOKEN),
})

export const login = async (email: string, password: string): Promise<Login> =>
    new Promise((resolve, reject) => {
        const request = fetch(`http://localhost:5000/auth/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.message) {
                    console.log(data.message)
                    reject(data.message)
                }
                resolve(data)
            })
        )
    })

export const readTodos = async (): Promise<Todo[]> =>
    new Promise((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos`, {
            headers: {
                ...getHeader(),
            },
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.message) {
                    reject(data.message)
                }
                resolve(data)
            })
        )
    })

export const deleteTodo = async (id: string): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                ...getHeader(),
            },
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.message) {
                    reject(data.message)
                }
                resolve(data)
            })
        )
    })

export const createTodo = async (todo: Todo): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos`, {
            method: 'POST',
            headers: {
                ...getHeader(),
            },
            body: JSON.stringify(todo),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.message) {
                    reject(data.message)
                }
                resolve(data)
            })
        )
    })

export const updateTodo = async (todo: Todo): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                ...getHeader(),
            },
            body: JSON.stringify(todo),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.message) {
                    reject(data.message)
                }
                resolve(data)
            })
        )
    })
