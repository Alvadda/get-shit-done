import { object, string, boolean, date } from 'yup'

const createTodoSchema = object({
    body: object({
        description: string().required('Todo must have a description'),
        douDate: date().nullable(),
        project: object({
            id: string(),
            name: string(),
        }).nullable(),
    }),
})

const readTodoSchema = object({
    params: object({
        id: string().required('You need a ID to read a specific Todo'),
    }),
})

const updateTodoSchema = object({
    body: object({
        description: string().required('Todo must have a description'),
        done: boolean().required('Todo must have a done flag'),
        project: object({
            id: string(),
            name: string(),
        }).nullable(),
    }),
    params: object({
        id: string().required('You need a ID to update a Todo'),
    }),
})

const deleteTodoSchema = object({
    params: object({
        id: string().required('You need a ID to delete a Todo'),
    }),
})

export { createTodoSchema, readTodoSchema, updateTodoSchema, deleteTodoSchema }
