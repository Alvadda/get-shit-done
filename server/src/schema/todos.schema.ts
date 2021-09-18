import { object, string, number } from 'yup'

const createTodoSchema = object({
    body: object({
        description: string().required('Todo must have a description'),
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
