export interface Todo {
    id?: string
    description: string
    createdAt?: Date
}

export const readTodos = async (): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos`)
        request.then((response) =>
            response.json().then((data) => {
                if (data.error) {
                    reject(data.error)
                }
                resolve(data)
            })
        )
    })

export const deleteTodo = async (id: string): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE',
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.error) {
                    reject(data.error)
                }
                resolve(data)
            })
        )
    })

export const createTodo = async (todo: Todo): Promise<Todo[]> =>
    new Promise<Todo[]>((resolve, reject) => {
        const request = fetch(`http://localhost:5000/todos`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(todo),
        })
        request.then((response) =>
            response.json().then((data) => {
                if (data.error) {
                    reject(data.error)
                }
                resolve(data)
            })
        )
    })
