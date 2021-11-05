import { object, string, boolean, date } from 'yup'

const sendTodoSchema = object({
    params: object({
        id: string().required('You need a Session ID'),
    }),
    body: object({
        description: string().required('Todo must have a description'),
        douDate: date().nullable(),
    }),
})

const validSendTodoSessionSchema = object({
    params: object({
        id: string().required('You need a Session ID'),
    }),
})

export { sendTodoSchema, validSendTodoSessionSchema }
