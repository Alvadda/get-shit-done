import { object, string, date, number } from 'yup'

const sendTodoSchema = object({
    params: object({
        id: string().required('You need a Session ID'),
    }),
    body: object({
        description: string().required('Todo must have a description'),
        douDate: date().nullable(),
    }),
})

const createSendTodoSessionSchema = object({
    params: object({
        todos: number().nullable(),
        days: number().nullable(),
    }),
})

const validSendTodoSessionSchema = object({
    params: object({
        id: string().required('You need a Session ID'),
    }),
})

export { sendTodoSchema, validSendTodoSessionSchema, createSendTodoSessionSchema }
